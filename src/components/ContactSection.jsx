import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiPhone } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqejzljq";

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [formStatus, setFormStatus] = useState("idle");

    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("sending");
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setFormStatus("error");
            }
        } catch {
            setFormStatus("error");
        }
    };

    return (
        <section className="relative bg-gradient-to-b from-black to-[#1a0533] min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto">

                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-violet-400 font-semibold tracking-widest uppercase text-sm mb-3"
                    >
                        Get In Touch
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Let's Build Something Crazy
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-purple-200 text-lg max-w-xl mx-auto"
                    >
                        Have a project in mind or just want to say hi? My inbox is always open.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Connect with me</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
                            </p>
                        </div>

                        {[
                            { icon: <FiPhone className="w-5 h-5" />,    label: "Phone",    value: "+91 7827131954",                href: "tel:+917827131954" },
                            { icon: <FiMail className="w-5 h-5" />,     label: "Email",    value: "rahulgoyal83789@gmail.com",     href: "mailto:rahulgoyal83789@gmail.com" },
                            { icon: <FiLinkedin className="w-5 h-5" />, label: "LinkedIn", value: "linkedin.com/in/rahulgoyal83789", href: "https://linkedin.com/in/rahulgoyal83789" },
                            { icon: <FiGithub className="w-5 h-5" />,   label: "GitHub",   value: "github.com/rahulgoyal83789",    href: "https://github.com/rahulgoyal83789" },
                            { icon: <FiInstagram className="w-5 h-5" />, label: "Instagram", value: "@rahulgoyal83789",              href: "https://instagram.com/rahulgoyal83789" },
                            { icon: <BsTwitterX className="w-5 h-5" />, label: "X(formerly Twitter)",  value: "@rahulgoyal83789",              href: "https://x.com/rahulgoyal83789" },
                        ].map(({ icon, label, value, href }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("mailto") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-violet-900/40 border border-violet-700/40 flex items-center justify-center text-violet-400 group-hover:bg-violet-700/60 group-hover:border-violet-500 group-hover:text-white transition-all duration-300">
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">{value}</p>
                                </div>
                            </a>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
                    >
                        {formStatus === "success" ? (
                            <div className="text-center py-10">
                                <p className="text-5xl mb-4">🎉</p>
                                <h3 className="text-2xl font-bold text-white mb-2">Message sent!</h3>
                                <p className="text-gray-400">I'll get back to you as soon as possible.</p>
                                <button
                                    onClick={() => setFormStatus("idle")}
                                    className="mt-6 px-6 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors duration-300"
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                                    <input
                                        type="text" id="name" required
                                        value={formData.name} onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                                    <input
                                        type="email" id="email" required
                                        value={formData.email} onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                                    <textarea
                                        id="message" required rows="5"
                                        value={formData.message} onChange={handleChange}
                                        placeholder="What would you like to discuss?"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none"
                                    />
                                </div>

                                {formStatus === "error" && (
                                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email me directly.</p>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={formStatus === "sending"}
                                    whileHover={{ scale: formStatus === "sending" ? 1 : 1.02 }}
                                    whileTap={{ scale: formStatus === "sending" ? 1 : 0.98 }}
                                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-violet-600/40 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {formStatus === "sending" ? "Sending…" : "Send Message"}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;