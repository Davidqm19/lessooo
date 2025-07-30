document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTORES ---
    const body = document.body;
    const htmlElement = document.documentElement;
    const navLinks = document.querySelectorAll('.navbar a');
    const pages = document.querySelectorAll('.page');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarUl = document.querySelector('.navbar ul');
    // Formularios y Auth
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authLink = document.getElementById('auth-link');
    const portfolioLink = document.getElementById('portfolio-link');
    const logoutButtonMain = document.getElementById('logout-button'); // El del header del dashboard (AHORA ELIMINADO DEL HTML)
    const logoutButtonSidebar = document.getElementById('logout-button-sidebar');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const socialLoginButtons = document.querySelectorAll('.social-button');
    // Footer
    const currentYearSpan = document.getElementById('current-year');
    // Controles Header
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageSelect = document.getElementById('language-select');
    // Dashboard
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');

    // --- CONFIGURACIÓN INICIAL ---
    const currentLang = localStorage.getItem('language') || 'es';
    const currentTheme = localStorage.getItem('theme') || 'light';
    const validPageIds = ['home', 'podcast', 'contact-brokers', 'careers', 'login', 'register', 'portfolio']; // Añadido 'podcast'

    // --- DICCIONARIO DE TRADUCCIONES (CON CONTENIDO GENÉRICO) ---
    const translations = {
        'es': {
            'site_title': 'LESO - Gestión Patrimonial Inteligente',
            'nav_home': 'Inicio', 'nav_podcast': 'Podcast', 'nav_contact_brokers': 'Contacto Corredores', 'nav_careers': 'Carreras', 'nav_login': 'Acceso Clientes', 'nav_portfolio': 'Mi Portafolio',
            'home_title': 'LESO Gestión Patrimonial', 'home_subtitle': 'Construyendo tu futuro financiero con estrategias de inversión personalizadas, tecnología avanzada y un enfoque centrado en tus objetivos.', 'home_cta': 'Descubre Más',
            'about_title': 'Nuestra Esencia', 'about_intro': 'En LESO, fusionamos décadas de experiencia en mercados globales con innovación tecnológica y un compromiso ético inquebrantable. Creemos en relaciones a largo plazo basadas en la confianza y la transparencia.', 'about_objectives_title': 'Nuestros Pilares',
            'about_obj_1': '<strong>Rendimiento Optimizado:</strong> Buscamos retornos superiores ajustados al riesgo mediante análisis riguroso.', 'about_obj_2': '<strong>Preservación del Capital:</strong> Implementamos estrategias robustas de gestión de riesgos para proteger tu patrimonio.', 'about_obj_3': '<strong>Transparencia Total:</strong> Acceso claro y constante a tu información financiera a través de nuestra plataforma INDUS.', 'about_obj_4': '<strong>Asesoramiento Personalizado:</strong> Soluciones a medida que evolucionan contigo y tus metas financieras.',
            'about_mission_vision_title': 'Filosofía de Inversión', 'about_mission_label': 'Misión:', 'about_mission_text': 'Guiar a nuestros clientes hacia la prosperidad financiera sostenible, ofreciendo asesoramiento experto y soluciones de inversión inteligentes.', 'about_vision_label': 'Visión:', 'about_vision_text': 'Ser el socio estratégico de confianza para la gestión patrimonial en Latinoamérica, liderando con integridad e innovación.',
            'about_team_title': 'Conoce al Equipo', 'about_team_intro': 'Un equipo multidisciplinario dedicado a tu éxito.', 'team_title_1': 'CEO & Estratega Jefe', 'team_bio_1': 'Más de 20 años liderando estrategias de inversión globales y gestión de portafolios complejos.', 'team_title_2': 'Directora de Inversiones (CIO)', 'team_bio_2': 'Experta en análisis macroeconómico global, asignación de activos y selección de valores.', 'team_title_3': 'Gerente de Experiencia del Cliente', 'team_bio_3': 'Dedicada a construir relaciones sólidas y asegurar una comunicación fluida y proactiva.',
            'how_title': 'Nuestro Proceso Simplificado', 'how_intro': 'Un camino claro y estructurado hacia tus metas financieras, diseñado para tu tranquilidad y confianza.',
            'how_step1_title': '1. Descubrimiento', 'how_step1_desc': 'Conversación profunda para entender tus aspiraciones, situación actual y perfil de riesgo detallado.', 'how_step2_title': '2. Estrategia a Medida', 'how_step2_desc': 'Diseño de un plan de inversión diversificado y optimizado, alineado con tus objetivos únicos.', 'how_step3_title': '3. Implementación Precisa', 'how_step3_desc': 'Ejecución eficiente y oportuna de la estrategia en los mercados globales más adecuados.', 'how_step4_title': '4. Monitoreo Proactivo', 'how_step4_desc': 'Supervisión constante del portafolio con INDUS y ajustes estratégicos según las condiciones del mercado.', 'how_step5_title': '5. Comunicación Continua', 'how_step5_desc': 'Reportes periódicos claros y concisos, y reuniones estratégicas para mantenerte siempre informado.',
            'benefits_title': 'Ventajas y Desempeño', 'benefits_advantages_subtitle': '¿Por Qué Elegir LESO?', 'benefits_intro': 'Combinamos conocimiento experto, tecnología de vanguardia y un compromiso inquebrantable con tus intereses.',
            'advantage1_title': 'Experiencia Global', 'advantage1_desc': 'Navegamos los mercados internacionales con un profundo conocimiento local y análisis macro.', 'advantage2_title': 'Soluciones a Tu Medida', 'advantage2_desc': 'No creemos en "talla única". Tu estrategia financiera es tan única como tú.', 'advantage3_title': 'Plataforma INDUS', 'advantage3_desc': 'Control total, visión 360° de tu portafolio y análisis avanzados, 24/7 de forma segura.', 'advantage4_title': 'Transparencia Absoluta', 'advantage4_desc': 'Sin sorpresas. Estructura de costos clara, informes detallados y comunicación honesta.', 'advantage5_title': 'Gestión de Riesgos', 'advantage5_desc': 'Un enfoque disciplinado y cuantitativo para proteger tu capital en cualquier escenario.', 'advantage6_title': 'Enfoque en Resultados', 'advantage6_desc': 'Comprometidos activamente con la generación de valor sostenible a largo plazo para tu patrimonio.',
            'benefits_results_subtitle': 'Resultados Comprobables', 'results_intro': 'Creemos en la evidencia y la transparencia. Utilizamos benchmarks del sector y análisis rigurosos. INDUS te muestra:', 'results_metric_1': 'Rendimiento histórico detallado y atribuido.', 'results_metric_2': 'Comparativas claras con índices de referencia.', 'results_metric_3': 'Análisis de contribución por activo.', 'results_metric_4': 'Métricas clave de riesgo-retorno (Sharpe, Volatilidad).',
            'results_disclaimer_label': 'Nota Importante:', 'results_disclaimer_text': 'El rendimiento pasado no garantiza resultados futuros. Toda inversión implica riesgos inherentes, incluida la posible pérdida de capital.', 'results_case_study_title': 'Caso Destacado', 'results_case_study_text': 'Portafolio de crecimiento balanceado superó consistentemente su índice de referencia en un 12% anualizado (neto de comisiones) durante los últimos 5 años, gracias a la diversificación global y gestión táctica.',
            'final_cta_title': '¿Listo para Potenciar Tu Futuro Financiero?', 'final_cta_text': 'Contáctanos hoy para una consulta confidencial sin compromiso y descubre cómo la gestión patrimonial de LESO puede ayudarte a alcanzar tus metas financieras más ambiciosas.', 'final_cta_button': 'Solicitar Consulta Personalizada',
            'podcast_title': 'Podcast: De CEO A CEO', 'podcast_description': 'Conversaciones profundas con líderes empresariales sobre estrategia, innovación y los desafíos de dirigir organizaciones en el complejo entorno actual. Escucha y aprende directamente de quienes toman las decisiones.', 'podcast_listen_on': 'Escúchalo en tu plataforma favorita:', 'podcast_listen_youtube': 'Ver en YouTube', 'podcast_listen_spotify': 'Escuchar en Spotify', 'podcast_listen_apple': 'Escuchar en Apple Podcasts', 'podcast_follow_on': 'Síguenos también en:', 'podcast_follow_tiktok_aria': 'Síguenos en TikTok', 'podcast_follow_instagram_aria': 'Síguenos en Instagram',
            'contact_brokers_title': 'Contacto para Corredores', 'contact_brokers_intro': 'Si representas a una firma de corretaje y buscas establecer sinergias estratégicas, por favor completa este formulario. Nuestro equipo se pondrá en contacto.',
            'careers_title': 'Únete a Nuestro Equipo', 'careers_intro': 'Buscamos talento excepcional con pasión por las finanzas, la tecnología y el servicio al cliente. Si crees que puedes aportar valor, revisa nuestras posiciones abiertas o envíanos tu candidatura espontánea.',
            'form_name': 'Nombre Completo', 'form_email': 'Correo Electrónico', 'form_company': 'Empresa (Opcional)', 'form_message': 'Tu Mensaje', 'form_send_button': 'Enviar Mensaje', 'form_cv': 'Adjuntar Hoja de Vida (PDF)', 'form_message_optional': 'Carta de Presentación (Opcional)', 'form_submit_application': 'Enviar Candidatura',
            'login_title': 'Acceso Clientes INDUS', 'login_username': 'Email o Usuario', 'login_password': 'Contraseña', 'login_button': 'Ingresar', 'login_error': 'Credenciales incorrectas. Verifica tus datos e intenta de nuevo.', 'login_no_account': '¿Primera vez aquí?', 'login_register_link': 'Crea tu cuenta',
            'register_title': 'Registro de Nuevo Cliente', 'register_name': 'Nombre Completo', 'register_email': 'Correo Electrónico', 'register_password': 'Crear Contraseña Segura', 'register_confirm_password': 'Confirmar Contraseña', 'register_button': 'Registrarme Ahora', 'register_error_placeholder': 'Ocurrió un error durante el registro.', 'register_error_password_mismatch': 'Las contraseñas ingresadas no coinciden. Por favor, verifícalas.', 'register_error_fields_required': 'Por favor, completa todos los campos marcados como requeridos.', 'register_success': '¡Registro exitoso! Serás redirigido al login en breve.',
            'register_social_divider': 'o ingresa rápidamente con', 'register_social_warning': '(Login social simulado)', 'register_has_account': '¿Ya tienes una cuenta?', 'register_login_link': 'Ingresa aquí',
            'social_login_not_implemented': 'Login con {PROVIDER} es simulado (requiere backend).',
            'portfolio_title': 'INDUS - Mi Portafolio', 'portfolio_logout': 'Cerrar Sesión', 'portfolio_welcome': 'Bienvenido de nuevo a tu centro financiero INDUS.', 'portfolio_summary_title': 'Resumen General (Ejemplo)', 'portfolio_total_value': 'Valor Total Portafolio:', 'portfolio_ytd': 'Rendimiento Acumulado (Año):', 'portfolio_last_update': 'Actualizado:', 'portfolio_assets_title': 'Mis Activos (Ejemplo)',
            'portfolio_table_asset': 'Instrumento', 'portfolio_table_quantity': 'Cantidad', 'portfolio_table_market_value': 'Valor Mercado', 'portfolio_table_percentage': '% Total', 'portfolio_table_loading': 'Cargando datos...',
            'portfolio_dashboard_title': 'Panel Principal', 'dashboard_nav_overview': 'Resumen', 'dashboard_nav_assets': 'Detalle Activos', 'dashboard_nav_charts': 'Análisis Gráfico', 'dashboard_nav_transactions': 'Historial Movimientos', 'dashboard_nav_settings': 'Configuración',
            'portfolio_charts_title': 'Visualización de Datos', 'portfolio_chart_placeholder': '[Gráficos interactivos de rendimiento y composición irían aquí]',
            'portfolio_transactions_title': 'Últimos Movimientos',
            'portfolio_settings_title': 'Preferencias', 'portfolio_settings_text': 'Configura alertas de mercado, notificaciones y preferencias de reportes personalizados.',
            'portfolio_actions_title': 'Acciones Comunes', 'portfolio_action_report': 'Descargar Reporte PDF', 'portfolio_action_rebalance': 'Discutir Rebalanceo',
            'footer_rights': 'Todos los derechos reservados.', 'footer_omni': 'Desarrollado por OMNI.', 'footer_contact_label': 'Contacto Directo:', 'footer_privacy': 'Política de Privacidad', 'footer_terms': 'Términos de Uso',
        },
        'en': { // ENGLISH TRANSLATIONS
            'site_title': 'LESO - Intelligent Wealth Management',
            'nav_home': 'Home', 'nav_podcast': 'Podcast', 'nav_contact_brokers': 'Broker Contact', 'nav_careers': 'Careers', 'nav_login': 'Client Access', 'nav_portfolio': 'My Portfolio',
            'home_title': 'LESO Wealth Management', 'home_subtitle': 'Building your financial future with personalized investment strategies, advanced technology, and a focus centered on your goals.', 'home_cta': 'Discover More',
            'about_title': 'Our Essence', 'about_intro': 'At LESO, we merge decades of global market experience with technological innovation and an unwavering ethical commitment. We believe in long-term relationships based on trust and transparency.', 'about_objectives_title': 'Our Pillars',
            'about_obj_1': '<strong>Optimized Performance:</strong> We seek superior risk-adjusted returns through rigorous analysis.', 'about_obj_2': '<strong>Capital Preservation:</strong> We implement robust risk management strategies to protect your wealth.', 'about_obj_3': '<strong>Total Transparency:</strong> Clear and constant access to your financial information via our INDUS platform.', 'about_obj_4': '<strong>Personalized Advice:</strong> Tailored solutions that evolve with you and your financial goals.',
            'about_mission_vision_title': 'Investment Philosophy', 'about_mission_label': 'Mission:', 'about_mission_text': 'To guide our clients towards sustainable financial prosperity by offering expert advice and intelligent investment solutions.', 'about_vision_label': 'Vision:', 'about_vision_text': 'To be the trusted strategic partner for wealth management in Latin America, leading with integrity and innovation.',
            'about_team_title': 'Meet the Team', 'about_team_intro': 'A multidisciplinary team dedicated to your financial success.', 'team_title_1': 'CEO & Chief Strategist', 'team_bio_1': 'Over 20 years leading global investment strategies and complex portfolio management.', 'team_title_2': 'Chief Investment Officer (CIO)', 'team_bio_2': 'Expert in global macroeconomic analysis, asset allocation, and security selection.', 'team_title_3': 'Client Experience Manager', 'team_bio_3': 'Dedicated to building strong relationships and ensuring seamless, proactive communication.',
            'how_title': 'Our Simplified Process', 'how_intro': 'A clear and structured path towards your financial goals, designed for your peace of mind and confidence.',
            'how_step1_title': '1. Discovery', 'how_step1_desc': 'In-depth conversation to fully understand your aspirations, current situation, and detailed risk profile.', 'how_step2_title': '2. Tailored Strategy', 'how_step2_desc': 'Design of a diversified and optimized investment plan, aligned with your unique objectives.', 'how_step3_title': '3. Precise Implementation', 'how_step3_desc': 'Efficient and timely execution of the strategy in the most suitable global markets.', 'how_step4_title': '4. Proactive Monitoring', 'how_step4_desc': 'Continuous portfolio supervision with INDUS and strategic adjustments based on market conditions.', 'how_step5_title': '5. Continuous Communication', 'how_step5_desc': 'Clear, concise periodic reports and strategic meetings to always keep you informed.',
            'benefits_title': 'Advantages & Performance', 'benefits_advantages_subtitle': 'Why Choose LESO?', 'benefits_intro': 'We combine expert knowledge, cutting-edge technology, and an unwavering commitment to your interests.',
            'advantage1_title': 'Global Expertise', 'advantage1_desc': 'We navigate international markets with deep local knowledge and macro analysis.', 'advantage2_title': 'Tailored Solutions', 'advantage2_desc': 'We don\'t believe in one-size-fits-all. Your financial strategy is as unique as you.', 'advantage3_title': 'INDUS Platform', 'advantage3_desc': 'Total control, 360° portfolio view, and advanced analytics, 24/7 securely.', 'advantage4_title': 'Absolute Transparency', 'advantage4_desc': 'No surprises. Clear cost structure, detailed reports, and honest communication.', 'advantage5_title': 'Risk Management', 'advantage5_desc': 'A disciplined and quantitative approach to protect your capital in any scenario.', 'advantage6_title': 'Results-Driven', 'advantage6_desc': 'Actively committed to generating sustainable long-term value for your wealth.',
            'benefits_results_subtitle': 'Verifiable Results', 'results_intro': 'We believe in evidence and transparency. We use industry benchmarks and rigorous analysis. INDUS shows you:', 'results_metric_1': 'Detailed and attributed historical performance.', 'results_metric_2': 'Clear comparisons with reference indices.', 'results_metric_3': 'Asset contribution analysis.', 'results_metric_4': 'Key risk-return metrics (Sharpe, Volatility).',
            'results_disclaimer_label': 'Important Note:', 'results_disclaimer_text': 'Past performance does not guarantee future results. All investments involve inherent risks, including the possible loss of capital.', 'results_case_study_title': 'Featured Case Study', 'results_case_study_text': 'Balanced growth portfolio consistently outperformed its benchmark by 12% annualized (net of fees) over the last 5 years, thanks to global diversification and tactical management.',
            'final_cta_title': 'Ready to Empower Your Financial Future?', 'final_cta_text': 'Contact us today for a confidential, no-obligation consultation and discover how LESO\'s wealth management can help you achieve your most ambitious financial goals.', 'final_cta_button': 'Request Personalized Consultation',
            'podcast_title': 'Podcast: From CEO To CEO', 'podcast_description': 'In-depth conversations with business leaders about strategy, innovation, and the challenges of leading organizations in today\'s complex environment. Listen and learn directly from decision-makers.', 'podcast_listen_on': 'Listen on your favorite platform:', 'podcast_listen_youtube': 'Watch on YouTube', 'podcast_listen_spotify': 'Listen on Spotify', 'podcast_listen_apple': 'Listen on Apple Podcasts', 'podcast_follow_on': 'Follow us also on:', 'podcast_follow_tiktok_aria': 'Follow us on TikTok', 'podcast_follow_instagram_aria': 'Follow us on Instagram',
            'contact_brokers_title': 'Broker Contact', 'contact_brokers_intro': 'If you represent a brokerage firm and seek strategic synergies, please complete this form. Our team will be in touch shortly.',
            'careers_title': 'Join Our Team', 'careers_intro': 'We seek exceptional talent with a passion for finance, technology, and client service. If you believe you can add value, review our open positions or send us your spontaneous application.',
            'form_name': 'Full Name', 'form_email': 'Email Address', 'form_company': 'Company (Optional)', 'form_message': 'Your Message', 'form_send_button': 'Send Message', 'form_cv': 'Attach Resume (PDF)', 'form_message_optional': 'Cover Letter (Optional)', 'form_submit_application': 'Submit Application',
            'login_title': 'INDUS Client Access', 'login_username': 'Email or Username', 'login_password': 'Password', 'login_button': 'Login', 'login_error': 'Incorrect credentials. Please check your details and try again.', 'login_no_account': 'First time here?', 'login_register_link': 'Create your account',
            'register_title': 'New Client Registration', 'register_name': 'Full Name', 'register_email': 'Email Address', 'register_password': 'Create Secure Password', 'register_confirm_password': 'Confirm Password', 'register_button': 'Register Now', 'register_error_placeholder': 'An error occurred during registration.', 'register_error_password_mismatch': 'The entered passwords do not match. Please verify.', 'register_error_fields_required': 'Please fill in all required fields.', 'register_success': 'Registration successful! You will be redirected to login shortly.',
            'register_social_divider': 'or quickly sign up with', 'register_social_warning': '(Social login simulated)', 'register_has_account': 'Already have an account?', 'register_login_link': 'Login here',
            'social_login_not_implemented': 'Login with {PROVIDER} is simulated (requires backend setup).',
            'portfolio_title': 'INDUS - My Portfolio', 'portfolio_logout': 'Log Out', 'portfolio_welcome': 'Welcome back to your INDUS financial center.', 'portfolio_summary_title': 'General Summary (Example)', 'portfolio_total_value': 'Total Portfolio Value:', 'portfolio_ytd': 'Year-to-Date Performance:', 'portfolio_last_update': 'Updated:', 'portfolio_assets_title': 'My Assets (Example)',
            'portfolio_table_asset': 'Instrument', 'portfolio_table_quantity': 'Quantity', 'portfolio_table_market_value': 'Market Value', 'portfolio_table_percentage': '% Total', 'portfolio_table_loading': 'Loading data...',
            'portfolio_dashboard_title': 'Main Dashboard', 'dashboard_nav_overview': 'Summary', 'dashboard_nav_assets': 'Asset Detail', 'dashboard_nav_charts': 'Graphic Analysis', 'dashboard_nav_transactions': 'Movement History', 'dashboard_nav_settings': 'Settings',
            'portfolio_charts_title': 'Data Visualization', 'portfolio_chart_placeholder': '[Interactive performance and composition charts would go here]',
            'portfolio_transactions_title': 'Recent Movements',
            'portfolio_settings_title': 'Preferences', 'portfolio_settings_text': 'Configure market alerts, notifications, and personalized reporting preferences.',
            'portfolio_actions_title': 'Common Actions (Simulated)', 'portfolio_action_report': 'Download PDF Report', 'portfolio_action_rebalance': 'Discuss Rebalancing',
            'footer_rights': 'All rights reserved.', 'footer_omni': 'Developed by OMNI.', 'footer_contact_label': 'Direct Contact:', 'footer_privacy': 'Privacy Policy', 'footer_terms': 'Terms of Use',
        },
        'de': { /* ... PLACEHOLDERS ... */ }, 'zh': { /* ... PLACEHOLDERS ... */ }, 'fr': { /* ... PLACEHOLDERS ... */ }
    };

    // --- FUNCIONES ---

    function getTranslation(key, lang = null) {
         const currentLang = lang || localStorage.getItem('language') || 'es';
         const fallbackLang = 'es';
         let translation = translations[currentLang]?.[key];
         if (translation === undefined && currentLang !== fallbackLang) {
             translation = translations[fallbackLang]?.[key];
         }
         return translation === undefined ? `[${key}]` : translation;
    }

    function setLanguage(lang) {
        const targetLang = translations[lang] ? lang : 'es';
        htmlElement.setAttribute('lang', targetLang);
        const elementsToTranslate = document.querySelectorAll('[data-lang-key]');

        elementsToTranslate.forEach(element => {
            const key = element.dataset.langKey;
            const translation = getTranslation(key, targetLang);
            const tagName = element.tagName.toLowerCase();
            const type = element.type?.toLowerCase();

            if (element.id === 'current-year') return;

            if (tagName === 'input' && (type === 'submit' || type === 'button')) {
                element.value = translation;
            } else if (element.placeholder !== undefined) {
                element.placeholder = translation;
            } else if (element.getAttribute('aria-label')) {
                 element.setAttribute('aria-label', translation);
            } else if (translation.includes('<') && element.innerHTML !== undefined) {
                element.innerHTML = translation;
            }
             else if (element.textContent !== undefined) {
                element.textContent = translation;
            }
        });

        localStorage.setItem('language', targetLang);
        if (languageSelect && languageSelect.value !== targetLang) {
             languageSelect.value = targetLang;
        }
        updateStaticErrorMessages(targetLang);
        addTableDataLabels();
    }

    function updateStaticErrorMessages(lang) {
        if (loginError && loginError.style.display !== 'none') { loginError.textContent = getTranslation('login_error', lang); }
        if (registerError && registerError.style.display !== 'none') {
            const currentErrorKey = registerError.dataset.errorKey || 'register_error_placeholder';
            registerError.textContent = getTranslation(currentErrorKey, lang);
        }
    }

    function applyTheme(theme) {
         const moonIcon = darkModeToggle?.querySelector('.fa-moon');
         const sunIcon = darkModeToggle?.querySelector('.fa-sun');
         if (theme === 'dark') {
             body.classList.add('dark-mode');
             if (moonIcon) moonIcon.style.display = 'none';
             if (sunIcon) sunIcon.style.display = 'inline-block';
         } else {
             body.classList.remove('dark-mode');
             if (moonIcon) moonIcon.style.display = 'inline-block';
             if (sunIcon) sunIcon.style.display = 'none';
         }
         localStorage.setItem('theme', theme);
     }

    function updateFooterYear() {
        if (currentYearSpan) {
            try {
                 const BogotaDate = new Date().toLocaleString("en-US", {timeZone: "America/Bogota"});
                 currentYearSpan.textContent = new Date(BogotaDate).getFullYear();
            } catch (e) {
                console.warn("Could not get Bogota time, using local year.", e);
                currentYearSpan.textContent = new Date().getFullYear();
            }
        }
     }

    function showPage(pageId) {
        if (!pageId || !validPageIds.includes(pageId)) { pageId = 'home'; }
        pages.forEach(page => { if (validPageIds.includes(page.id)) { page.classList.remove('active'); } });
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
            if (pageId !== 'home' || window.location.hash === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            console.error(`Page with ID ${pageId} not found.`);
            document.getElementById('home')?.classList.add('active');
            pageId = 'home';
        }
        navLinks.forEach(link => { link.classList.remove('active-link'); if (link.getAttribute('href') === `#${pageId}`) { link.classList.add('active-link'); } });
        if (navbarUl && navbarUl.classList.contains('active')) { navbarUl.classList.remove('active'); }
    }

    function checkLoginState() {
        return !!localStorage.getItem('leso_token');
    }

    function updateAuthUI(loggedIn) {
        if (loggedIn) {
            if(authLink) authLink.style.display = 'none';
            if(portfolioLink) portfolioLink.style.display = 'list-item';
        } else {
            if(authLink) authLink.style.display = 'list-item';
            if(portfolioLink) portfolioLink.style.display = 'none';
        }
        navLinks.forEach(link => link.classList.remove('active-link'));
        const currentHash = window.location.hash || '#home';
        const selector = currentHash === '#' ? '#home' : currentHash;
        const currentLink = document.querySelector(`.navbar a[href="${selector}"]`);
        if (currentLink) {
            currentLink.classList.add('active-link');
        } else {
            const homeLink = document.querySelector('.navbar a[href="#home"]');
            if(homeLink) homeLink.classList.add('active-link');
        }
    }

    function handlePageLoad() {
        const isLoggedIn = checkLoginState();
        let requestedPageId = window.location.hash.substring(1);
        if (!requestedPageId || !validPageIds.includes(requestedPageId)) {
            requestedPageId = 'home';
            if (window.location.hash && window.location.hash !== '#home') {
                 history.replaceState(null, null, '#home');
            } else if (!window.location.hash) {
                history.replaceState(null, null, '#home');
            }
        }
        if (requestedPageId === 'portfolio') { // MODIFICADO PARA PORTAFOLIO "PRÓXIMAMENTE"
            alert(getTranslation('portfolio_coming_soon'));
            requestedPageId = 'home';
            window.location.hash = 'home';
        } else if ((requestedPageId === 'login' || requestedPageId === 'register') && isLoggedIn) {
            requestedPageId = 'home'; // Si está logueado, llevarlo a home
            window.location.hash = 'home';
        }
        showPage(requestedPageId);
        updateAuthUI(isLoggedIn);
    }

    function handleLogout() {
         console.log('Cerrando sesión real.');
         localStorage.removeItem('leso_token');
         localStorage.removeItem('leso_user');
         window.location.hash = '#home';
     }
     
    function handleSuccessfulLogin(data) {
        localStorage.setItem('leso_token', data.token);
        localStorage.setItem('leso_user', JSON.stringify(data.user));
        if(loginError) loginError.style.display = 'none';
        
        // MODIFICADO: En lugar de ir a #portfolio, mostrar alerta y ir a #home
        alert(getTranslation('portfolio_coming_soon_after_login'));
        window.location.hash = '#home';
    }


    function addTableDataLabels() {
        const tables = document.querySelectorAll('.portfolio-details table');
        tables.forEach(table => {
            const headers = Array.from(table.querySelectorAll('thead th')).map(th => getTranslation(th.dataset.langKey) || th.textContent);
            table.querySelectorAll('tbody tr').forEach(row => {
                Array.from(row.querySelectorAll('td')).forEach((cell, index) => {
                    if (headers[index]) { cell.dataset.label = headers[index]; }
                });
            });
        });
    }

    function setActiveSidebarLink(targetId) {
        sidebarLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === `#${targetId}`) { link.classList.add('active'); } });
    }

    // --- ANIMATION OBSERVER ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observerCallback = (entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); };
    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);


    // --- SCROLL PROGRESS BAR ---
    function updateScrollProgress() {
        if (!scrollProgressBar) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollableHeight = scrollHeight - clientHeight;
        if (scrollableHeight <= 0) { scrollProgressBar.style.width = '0%'; return; }
        const scrollPercent = Math.min( (scrollTop / scrollableHeight) * 100, 100);
        scrollProgressBar.style.width = scrollPercent + '%';
    }


    // --- INICIALIZACIÓN y EVENT LISTENERS ---
    applyTheme(currentTheme);
    setLanguage(currentLang);
    if (languageSelect) languageSelect.value = currentLang;
    updateFooterYear();
    addTableDataLabels();
    handlePageLoad();
    window.addEventListener('hashchange', handlePageLoad);
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Observar elementos para animación
    animatedSections.forEach(section => { if (section) intersectionObserver.observe(section); });

    // Listener navegación principal
    navLinks.forEach(link => { link.addEventListener('click', (e) => {
        const targetHref = link.getAttribute('href');
        if (targetHref && targetHref.startsWith('#')) {
            const targetId = targetHref.substring(1);
            if (validPageIds.includes(targetId)) {
                e.preventDefault();
                const isLoggedIn = checkLoginState();
                let finalTargetHref = targetHref;

                // MODIFICADO PARA PORTAFOLIO "PRÓXIMAMENTE"
                if (targetId === 'portfolio') {
                    alert(getTranslation('portfolio_coming_soon'));
                    finalTargetHref = '#home';
                } else if ((targetId === 'login' || targetId === 'register') && isLoggedIn) {
                    finalTargetHref = '#home';
                }

                if (window.location.hash !== finalTargetHref) {
                    window.location.hash = finalTargetHref;
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                if (navbarUl && navbarUl.classList.contains('active')) {
                    navbarUl.classList.remove('active');
                }
            }
        }
    }); });

    // Listener Menú Móvil
    if (menuToggle && navbarUl) { menuToggle.addEventListener('click', (e) => { e.stopPropagation(); navbarUl.classList.toggle('active'); }); document.addEventListener('click', (e) => { if (navbarUl.classList.contains('active') && !navbarUl.contains(e.target) && !menuToggle.contains(e.target)) { navbarUl.classList.remove('active'); } }); }

    // Listener Modo Oscuro
    if (darkModeToggle) { darkModeToggle.addEventListener('click', () => { const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark'; applyTheme(newTheme); }); }

    // Listener Cambio Idioma
    if (languageSelect) { languageSelect.addEventListener('change', (e) => { setLanguage(e.target.value); }); }

    // Listener Login FUNCIONAL (MODIFICADO para no ir al portafolio)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('username')?.value;
            const password = document.getElementById('password')?.value;
            const errorEl = loginError;
            if (errorEl) errorEl.style.display = 'none';
            try {
                const response = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
                const data = await response.json();
                if (!response.ok) { throw new Error(data.message || 'Error al iniciar sesión.'); }
                console.log('Login exitoso:', data);
                handleSuccessfulLogin(data);
            } catch (error) {
                console.error('Error en el login:', error);
                if (errorEl) { errorEl.textContent = error.message; errorEl.style.display = 'block'; }
            }
        });
    }

    // Listener Registro FUNCIONAL
     if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name')?.value;
            const email = document.getElementById('reg-email')?.value;
            const password = document.getElementById('reg-password')?.value;
            const confirmPassword = document.getElementById('reg-confirm-password')?.value;
            const errorEl = registerError;
            if(errorEl) errorEl.style.display = 'none';
            if (!name || !email || !password || !confirmPassword) { if(errorEl) { errorEl.textContent = getTranslation('register_error_fields_required'); errorEl.dataset.errorKey = 'register_error_fields_required'; errorEl.style.display = 'block'; } return; }
            if (password !== confirmPassword) { if(errorEl) { errorEl.textContent = getTranslation('register_error_password_mismatch'); errorEl.dataset.errorKey = 'register_error_password_mismatch'; errorEl.style.display = 'block'; } return; }
            try {
                const response = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
                const data = await response.json();
                if (!response.ok) { throw new Error(data.message || 'Error en el registro.'); }
                console.log('Registro exitoso:', data);
                alert(getTranslation('register_success'));
                registerForm.reset();
                setTimeout(() => { window.location.hash = '#login'; }, 1000);
            } catch (error) {
                console.error('Error en el registro:', error);
                if (errorEl) { errorEl.textContent = error.message; errorEl.style.display = 'block'; }
            }
        });
    }

    // Listener Simulación Social Login (Actualizado)
    socialLoginButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = button.getAttribute('aria-label')?.split(' ').pop() || 'Social';
            let message = '';
            if (provider === 'OMNI') {
                message = getTranslation('social_login_omni_coming_soon');
            } else {
                const messageTemplate = getTranslation('social_login_not_implemented');
                message = messageTemplate.replace('{PROVIDER}', provider);
            }
            alert(message);
        });
    });

    // Formularios de Contacto y Carreras AHORA SON MANEJADOS POR NETLIFY
    // Se elimina la función handleFormSubmit

    // Listeners de Logout (Unificados)
    // if (logoutButtonMain) { logoutButtonMain.addEventListener('click', handleLogout); } // Eliminado del HTML
    if (logoutButtonSidebar) { logoutButtonSidebar.addEventListener('click', handleLogout); }

    // Listeners para navegación interna del Dashboard
     sidebarLinks.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); const targetId = link.getAttribute('href')?.substring(1); if (!targetId) return; const targetElement = document.getElementById(targetId); if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveSidebarLink(targetId); } }); });

    // Observer para data-labels
     if (typeof MutationObserver !== 'undefined') { const tableObserver = new MutationObserver(addTableDataLabels); document.querySelectorAll('.portfolio-details tbody').forEach(tbody => { if(tbody) tableObserver.observe(tbody, { childList: true }); }); } else { if (languageSelect) { languageSelect.addEventListener('change', addTableDataLabels); } }

});
