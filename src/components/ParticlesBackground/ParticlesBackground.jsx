import React, { useEffect, useRef } from 'react';

const ParticlesBackground = ({ containerRef }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        // Set canvas size to match container
        const resizeCanvas = () => {
            if (!containerRef?.current) {
                // Fallback to window size if container ref is not available
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                initParticles();
                return;
            }

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            // Set canvas to match container size
            canvas.width = rect.width;
            canvas.height = rect.height;

            // Position the canvas absolutely within its container
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';

            initParticles();
        };

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5; // Smaller particles
                this.speedX = (Math.random() - 0.5) * 0.5; // Slower initial speed
                this.speedY = (Math.random() - 0.5) * 0.5; // Slower initial speed
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges with some randomness
                if (this.x > canvas.width) {
                    this.x = canvas.width;
                    this.speedX = -Math.abs(this.speedX) * (0.8 + Math.random() * 0.2);
                } else if (this.x < 0) {
                    this.x = 0;
                    this.speedX = Math.abs(this.speedX) * (0.8 + Math.random() * 0.2);
                }
                if (this.y > canvas.height) {
                    this.y = canvas.height;
                    this.speedY = -Math.abs(this.speedY) * (0.8 + Math.random() * 0.2);
                } else if (this.y < 0) {
                    this.y = 0;
                    this.speedY = Math.abs(this.speedY) * (0.8 + Math.random() * 0.2);
                }
            }

            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            const area = Math.max(1, canvas.width * canvas.height);
            // Reduced density (increased divisor from 9000 to 18000) to improve performance
            const numberOfParticles = Math.max(40, Math.floor(area / 18000));
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        // Connect particles with lines
        const connectParticles = () => {
            const maxDistance = 120; // Slightly reduced connection distance

            for (let i = 0; i < particles.length; i++) {
                // Optimization: Draw connections directly without sorting
                // This removes array allocation and sorting overhead per particle
                for (let j = i; j < particles.length; j++) {
                    if (i === j) continue;

                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;

                    // Optimization: Check bounding box first to avoid sqrt
                    if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance) continue;

                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);

                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                        ctx.lineWidth = 0.5 + (opacity * 0.5);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    // Quick check
                    if (Math.abs(dx) > mouse.radius || Math.abs(dy) > mouse.radius) continue;

                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const opacity = 1 - distance / mouse.radius;
                        ctx.strokeStyle = `rgba(191, 255, 0, ${opacity * 0.8})`;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Mouse move handler (on window so it works even if canvas is behind content)
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();


            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                mouse.x = null;
                mouse.y = null;
                return;
            }

            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            mouse.x = (e.clientX - rect.left) * scaleX;
            mouse.y = (e.clientY - rect.top) * scaleY;

            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 250) {
                    const angle = Math.atan2(dy, dx);
                    // Slightly increased force for more responsive movement
                    const force = (1 - distance / 250) * 0.1;

                    // Apply smoother, slower movement
                    particle.speedX += Math.cos(angle) * force;
                    particle.speedY += Math.sin(angle) * force;

                    // Slightly increased random movement
                    particle.speedX += (Math.random() - 0.5) * 0.12;
                    particle.speedY += (Math.random() - 0.5) * 0.12;

                    const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                    const maxSpeed = 1.2; // Slightly increased max speed
                    if (speed > maxSpeed) {
                        particle.speedX = (particle.speedX / speed) * maxSpeed;
                        particle.speedY = (particle.speedY / speed) * maxSpeed;
                    }
                }
            });
        };

        // When cursor leaves the window, clear mouse
        const handleMouseLeaveWindow = (e) => {
            if (!e.relatedTarget && e.toElement === null) {
                mouse.x = null;
                mouse.y = null;
            }
        };

        // Click to add particles
        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();

            // Check if click is within bounds
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                return;
            }

            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;
            for (let i = 0; i < 6; i++) {
                const particle = new Particle();
                particle.x = clickX + (Math.random() - 0.5) * 10;
                particle.y = clickY + (Math.random() - 0.5) * 10;
                particles.push(particle);
            }
        };

        // Initialize
        const init = () => {
            resizeCanvas();
            animate();

            // Add resize observer to handle container size changes
            const resizeObserver = new ResizeObserver(() => {
                resizeCanvas();
            });

            if (containerRef.current) {
                resizeObserver.observe(containerRef.current);
            }

            return () => {
                if (containerRef.current) {
                    resizeObserver.unobserve(containerRef.current);
                }
                cancelAnimationFrame(animationFrameId);
            };
        };

        const cleanup = init();

        // Event listeners (use pointer events for broader support)
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('pointermove', handleMouseMove);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeaveWindow);
        window.addEventListener('pointerdown', handleClick);
        window.addEventListener('click', handleClick);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('pointermove', handleMouseMove);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeaveWindow);
            window.removeEventListener('pointerdown', handleClick);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default ParticlesBackground;