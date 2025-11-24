import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Linkedin, MessageSquare, ChevronLeft, ChevronRight, User, Monitor, Clock, Lock, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

// --- Dados Mock (Para o Carrossel) ---
const images = [
    { url: "https://placehold.co/1200x500/A0BFFF/FFFFFF/png?text=Consultório+Moderno", alt: "Imagem de um consultório moderno e acolhedor." },
    { url: "https://placehold.co/1200x500/B0E0E6/FFFFFF/png?text=Sessão+Online", alt: "Imagem que representa uma sessão de terapia online." },
    { url: "https://placehold.co/1200x500/E6E6FA/FFFFFF/png?text=Profissional+Atencioso", alt: "Imagem do psicólogo sorrindo em um ambiente profissional." },
];

// --- Componente: Botão Flutuante do WhatsApp ---
const WhatsAppButton = ({ phoneNumber }) => (
    <a 
        href={`https://wa.me/${phoneNumber}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-110"
        title="Fale Conosco pelo WhatsApp"
    >
        <MessageSquare className="w-8 h-8 text-white" />
    </a>
);

// --- Componente: Carrossel ---
const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Auto-slide a cada 5 segundos
    useEffect(() => {
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <section id="home" className="relative w-full overflow-hidden shadow-2xl rounded-b-3xl">
            {/* Imagens do Carrossel */}
            <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className="w-full flex-shrink-0 h-96 md:h-[500px] relative bg-gray-200"
                    >
                        <img 
                            src={image.url} 
                            alt={image.alt} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1200x500/9CA3AF/FFFFFF/png?text=Imagem+indisponível" }}
                        />
                        {/* Overlay de Texto */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                            <div className="text-center text-white">
                                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                                    Seu Espaço para o Bem-Estar
                                </h1>
                                <p className="text-xl md:text-2xl font-light">
                                    Psicologia Humanizada e Acessível.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botões de Navegação */}
            <button 
                onClick={goToPrevious} 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition z-10"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={goToNext} 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition z-10"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicadores de Posição */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer transition duration-300 ${
                            index === currentIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-70'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
};

// --- Componente: Cabeçalho (Nav Bar) ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Funcao para scroll suave
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false); // Fecha o menu depois de clicar (em mobile)
        }
    };

    const navLinks = [
        { label: "Quem Sou Eu", id: "about" },
        { label: "Consultas", id: "consultations" },
        { label: "Agenda / Contato", id: "contact" },
    ];

    return (
        <header className="sticky top-0 z-40 bg-white shadow-lg">
            <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
                {/* Logo / Nome do Psicólogo */}
                <h1 className="text-2xl font-bold text-indigo-700">Dr(a). [Seu Nome] Psicólogo(a)</h1>

                {/* Menu Desktop */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map(link => (
                        <a 
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                            className="text-gray-700 font-medium hover:text-indigo-600 transition duration-150"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Botão Mobile */}
                <button 
                    className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Menu Mobile (Sidebar) */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white shadow-xl md:hidden">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-indigo-700">Menu</h2>
                        <button onClick={() => setIsMenuOpen(false)}>
                            <X className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                    <nav className="flex flex-col p-4 space-y-3">
                        {navLinks.map(link => (
                            <a 
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                                className="text-gray-700 text-lg font-medium p-3 rounded-lg hover:bg-indigo-50 transition"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

// --- Componente: Seção Quem Sou Eu ---
const AboutSection = () => (
    <section id="about" className="max-w-7xl mx-auto py-16 px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-4 border-indigo-400 pb-2 inline-block">
                    Quem Sou Eu
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                    Olá! Eu sou o(a) Dr(a). [Seu Nome], e minha missão é oferecer um espaço seguro e acolhedor para que você possa explorar seus sentimentos e desafios. Sou formado(a) em Psicologia pela [Nome da Universidade] e especialista em [Área de Especialização].
                </p>
                <p className="text-lg text-gray-600">
                    Acredito na abordagem [Sua Abordagem] e na capacidade inata de cada indivíduo de se desenvolver e encontrar suas próprias respostas. Minha prática é guiada pela ética, empatia e respeito pela sua jornada.
                </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 h-64 bg-gray-200 rounded-full overflow-hidden shadow-2xl border-4 border-indigo-500">
                    <User className="w-full h-full p-10 text-gray-500" />
                    {/* Substituir por uma foto de perfil real */}
                </div>
            </div>
        </div>
    </section>
);

// --- Componente de Card de Consulta ---
const ConsultationCard = ({ title, description, IconComponent }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 text-center">
        <div className="w-12 h-12 mx-auto mb-4 text-indigo-600">
            <IconComponent className="w-full h-full" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

// --- Componente: Seção Como São as Consultas ---
const ConsultationSection = () => (
    <section id="consultations" className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
                Como são as Consultas?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                <ConsultationCard 
                    title="Modalidade Online" 
                    description="Atendimento via plataformas seguras de videochamada, proporcionando flexibilidade e conforto no seu próprio ambiente."
                    IconComponent={Monitor}
                />
                <ConsultationCard 
                    title="Foco e Duração" 
                    description="Cada sessão tem a duração padrão de 50 minutos. A frequência é definida em conjunto, geralmente semanalmente, para garantir a consistência do processo."
                    IconComponent={Clock}
                />
                <ConsultationCard 
                    title="Confidencialidade" 
                    description="O sigilo é absoluto e inegociável. Todo o conteúdo abordado nas sessões é estritamente confidencial, seguindo o Código de Ética Profissional."
                    IconComponent={Lock}
                />
            </div>
        </div>
    </section>
);

// Função para formatar a data/hora do slot
const formatSlot = (slot) => {
    // slot.start_time e slot.end_time vêm do backend como strings ISO
    const startDate = new Date(slot.start_time);
    const endDate = new Date(slot.end_time);

    const formatter = new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    // Ex: "Segunda-feira, 24/11 às 14:00 - 14:50"
    const formattedDate = formatter.format(startDate).replace(', ', ', ').replace('às', 'às ')
    const timeEnd = endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return `${formattedDate} - ${timeEnd}`;
};

// --- Componente: Seção Contato / Agendamento (CORRIGIDO com Busca de Slots) ---
const ContactSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [complaint, setComplaint] = useState('');
    
    // Novos estados para o fluxo de agendamento
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(''); // ID do slot selecionado
    const [isSlotsLoading, setIsSlotsLoading] = useState(false);
    
    // Estados de feedback e loading
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setComplaint('');
        setSelectedAppointmentId('');
    };

    // 1. Efeito para buscar os slots disponíveis
    useEffect(() => {
        const fetchAvailableSlots = async () => {
            setIsSlotsLoading(true);
            try {
                // Rota CORRETA para buscar os horários disponíveis
                const API_URL = 'http://localhost:3001/api/public/available-appointments';
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`Erro ao carregar horários: ${response.statusText}`);
                }

                const data = await response.json();
                
                // Formato esperado: [{ id: 'uuid', start_time: 'ISO DATE', end_time: 'ISO DATE' }]
                setAvailableSlots(data);
                
                if (data.length > 0) {
                    setSelectedAppointmentId(data[0].id); // Seleciona o primeiro por padrão
                } else {
                     setFeedback({ 
                        type: 'error', 
                        message: 'Não há horários disponíveis no momento. Por favor, tente novamente mais tarde.' 
                    });
                }
            } catch (error) {
                console.error("Erro na busca de slots:", error);
                setFeedback({ 
                    type: 'error', 
                    message: `Não foi possível carregar os horários disponíveis. Verifique o servidor backend. (${error.message})` 
                });
            } finally {
                setIsSlotsLoading(false);
            }
        };

        fetchAvailableSlots();
    }, []); // Executa apenas na montagem do componente

    // 2. Função de envio corrigida
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFeedback(null);
        
        if (!selectedAppointmentId) {
             setFeedback({ 
                type: 'error', 
                message: 'Por favor, selecione um horário disponível para agendar sua consulta.' 
            });
            setIsLoading(false);
            return;
        }

        const payload = {
            appointment_id: selectedAppointmentId, // AGORA ESTE CAMPO É ENVIADO
            full_name: name,
            contact_phone: phone, 
            whatsapp: phone,
            initial_complaint: complaint,
        };

        const API_URL = 'http://localhost:3001/api/public/request-appointment'; 

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setFeedback({ 
                    type: 'success', 
                    message: 'Agendamento solicitado com sucesso! Em breve entraremos em contato para confirmar.' 
                });
                clearForm();
                setAvailableSlots(prev => prev.filter(slot => slot.id !== selectedAppointmentId)); // Remove o slot da lista
                setSelectedAppointmentId('');
            } else {
                // Erro de validação ou erro do servidor (ex: slot já ocupado)
                const errorMessage = data.message || 'Ocorreu um erro ao processar sua solicitação de agendamento.';
                
                setFeedback({ 
                    type: 'error', 
                    message: errorMessage
                });
            }
        } catch (error) {
            console.error("Erro na API:", error);
            setFeedback({ 
                type: 'error', 
                message: 'Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:3001.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="max-w-7xl mx-auto py-16 px-4 md:px-8">
            <div className="bg-indigo-50 p-8 md:p-12 rounded-2xl shadow-xl">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                    Agende sua Consulta
                </h2>
                <p className="text-lg text-gray-600 mb-8 text-center">
                    Escolha um horário disponível abaixo e preencha o formulário para solicitar sua sessão.
                </p>

                <div className="max-w-xl mx-auto">
                    {/* Feedback de Status Geral */}
                    {feedback && (
                        <div className={`p-4 rounded-lg mb-6 flex items-center ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {feedback.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3" /> : <AlertTriangle className="w-5 h-5 mr-3" />}
                            <p className="text-sm font-medium">{feedback.message}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Campo de Seleção de Horário */}
                        <div className="relative">
                            <label htmlFor="appointment_slot" className="block text-sm font-medium text-gray-700 mb-2">
                                Horário Disponível <span className="text-red-500">*</span>
                            </label>
                            {isSlotsLoading ? (
                                <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-300">
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin text-indigo-500" />
                                    <span className="text-gray-500">Carregando horários...</span>
                                </div>
                            ) : availableSlots.length === 0 ? (
                                <p className="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
                                    Nenhum horário disponível no momento. Tente novamente mais tarde.
                                </p>
                            ) : (
                                <select
                                    id="appointment_slot"
                                    value={selectedAppointmentId}
                                    onChange={(e) => setSelectedAppointmentId(e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition bg-white"
                                    required
                                    disabled={isLoading}
                                >
                                    <option value="" disabled>Selecione um horário...</option>
                                    {availableSlots.map(slot => (
                                        <option key={slot.id} value={slot.id}>
                                            {formatSlot(slot)}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Campos de Contato */}
                        <input 
                            type="text" 
                            placeholder="Nome Completo" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" 
                            required 
                            disabled={isLoading}
                        />
                        <input 
                            type="email" 
                            placeholder="E-mail (Opcional)" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" 
                            disabled={isLoading}
                        />
                        <input 
                            type="tel" 
                            placeholder="Telefone (WhatsApp) - Ex: 41998765432" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" 
                            required 
                            disabled={isLoading}
                        />
                        <textarea 
                            placeholder="Sua Queixa Inicial / Motivo do Contato (Obrigatório)" 
                            rows="4" 
                            value={complaint}
                            onChange={(e) => setComplaint(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition" 
                            required
                            disabled={isLoading}
                        ></textarea>
                        
                        <button 
                            type="submit" 
                            className={`w-full flex items-center justify-center text-white p-4 rounded-lg font-semibold text-lg transition duration-150 shadow-md ${
                                isLoading || isSlotsLoading || availableSlots.length === 0
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                            }`}
                            disabled={isLoading || isSlotsLoading || availableSlots.length === 0 || !selectedAppointmentId}
                        >
                            {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                            {isLoading ? 'Solicitando Agendamento...' : 'Solicitar Agendamento'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};


// --- Componente: Rodapé ---
const Footer = ({ socialMedia }) => (
    <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
                
                {/* Informação de Contato */}
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-3 text-indigo-300">Dr(a). [Seu Nome]</h3>
                    <p className="text-sm text-gray-400">Psicólogo(a) Clínico(a)</p>
                    <p className="text-sm text-gray-400">CRP 00/00000</p>
                </div>

                {/* Mídias Sociais */}
                <div className="flex space-x-6">
                    <a 
                        href={socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-pink-400 transition"
                        title="Instagram"
                    >
                        <Instagram className="w-8 h-8" />
                    </a>
                    <a 
                        href={socialMedia.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-400 transition"
                        title="LinkedIn"
                    >
                        <Linkedin className="w-8 h-8" />
                    </a>
                </div>
            </div>

            {/* Créditos do Desenvolvedor */}
            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Todos os direitos reservados.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Site desenvolvido por Klisman
                </p>
            </div>
        </div>
    </footer>
);


// --- Componente Principal da Aplicação ---
const App = () => {
    // Substitua pelo número real do psicólogo (País+DDD+Número, sem caracteres especiais)
    const WHATSAPP_NUMBER = '5541998765432'; 
    const socialMediaLinks = {
        instagram: 'https://www.instagram.com/seuperfil/',
        linkedin: 'https://www.linkedin.com/in/seuperfil/',
    };

    return (
        <div className="min-h-screen bg-gray-100 antialiased font-sans">
            <Header />
            <main>
                <HeroCarousel />
                <AboutSection />
                <ConsultationSection />
                <ContactSection />
            </main>
            <Footer socialMedia={socialMediaLinks} />
            <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} />
        </div>
    );
};

export default App;