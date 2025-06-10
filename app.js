// Application data
const appData = {
  screenTimeRecommendations: {
    "0-2 anos": "0 horas - Evitar completamente",
    "3-5 anos": "30 minutos com supervisão",
    "6-12 anos": "1 hora com orientação",
    "12+ anos": "2 horas com reflexão crítica"
  },
  digitalRisks: [
    "Redução de interacções presenciais",
    "Impacto no sono e descanso",
    "Dificuldades de concentração",
    "Exposição a conteúdos inadequados",
    "Cyberbullying",
    "Viciamento em algoritmos"
  ],
  digitalBenefits: [
    "Acesso a informação educativa",
    "Desenvolvimento de competências digitais",
    "Criatividade e expressão",
    "Inclusão social",
    "Preparação para o futuro",
    "Aprendizagem personalizada"
  ],
  technoAdolescentCharacteristics: [
    { icon: "fas fa-globe", title: "Vida Onlife", desc: "Online + Offline integrados" },
    { icon: "fas fa-user-circle", title: "Identidade Digital", desc: "Em constante construção" },
    { icon: "fas fa-tasks", title: "Multitarefa", desc: "Tecnológica natural" },
    { icon: "fas fa-graduation-cap", title: "Aprendizagem", desc: "Informal e autónoma" },
    { icon: "fas fa-video", title: "Criadores", desc: "De conteúdo digital" },
    { icon: "fas fa-bullhorn", title: "Activismo", desc: "Digital e social" }
  ],
  safetyChecklist: [
    "Configurar controlos parentais",
    "Educar sobre privacidade",
    "Estabelecer regras claras",
    "Dar o exemplo",
    "Comunicar abertamente",
    "Monitorizar sem invadir"
  ],
  schoolTools: [
    { icon: "fas fa-tablet-alt", name: "Tablets Educativos", desc: "Aprendizagem interactiva" },
    { icon: "fas fa-chalkboard", name: "Quadros Interactivos", desc: "Apresentações dinâmicas" },
    { icon: "fas fa-laptop", name: "Plataformas LMS", desc: "Gestão de aprendizagem" },
    { icon: "fas fa-cube", name: "Realidade Aumentada", desc: "Experiências imersivas" },
    { icon: "fas fa-code", name: "Programação", desc: "Pensamento computacional" },
    { icon: "fas fa-users", name: "Colaboração Online", desc: "Trabalho em equipa" }
  ],
  digitalCompetences: [
    "Literacia informacional",
    "Pensamento crítico",
    "Criação de conteúdos",
    "Comunicação responsável",
    "Resolução de problemas",
    "Cidadania digital"
  ],
  quizQuestions: [
    {
      question: "É verdade que os ecrãs são sempre prejudiciais para as crianças?",
      options: ["Sim, sempre", "Não, depende do uso", "Só para menores de 5 anos", "Só se usado mais de 1 hora"],
      correct: 1,
      explanation: "Os ecrãs não são intrinsecamente maus. O impacto depende do conteúdo, duração, idade da criança e contexto de uso."
    },
    {
      question: "Qual é a idade recomendada para introduzir ecrãs recreativos?",
      options: ["1 ano", "2 anos", "3 anos", "5 anos"],
      correct: 2,
      explanation: "Aos 3 anos, as crianças podem começar a usar ecrãs recreativos por períodos curtos e supervisionados."
    },
    {
      question: "O tempo de ecrã antes de dormir afecta o sono?",
      options: ["Não afecta", "Só em adultos", "Sim, afecta a qualidade do sono", "Só se for mais de 3 horas"],
      correct: 2,
      explanation: "A luz azul dos ecrãs pode interferir com a produção de melatonina, afectando a qualidade do sono."
    }
  ]
};

// Global variables
let currentSection = 'home';
let currentQuizQuestion = 0;
let quizScore = 0;
let isDarkMode = false;
let quizAnswered = false;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // document.title = "TESTING: initializeApp was called"; // Test line removed

  setupNavigation();
  setupThemeToggle();
  setupBackToTop();
  populateContent();
  setupInteractiveElements();
  showSection('home');
}

// Navigation
function setupNavigation() {
  // console.log("Running setupNavigation"); // Debug
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sectionCards = document.querySelectorAll('.section-card');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      showSection(section);
      updateActiveNavLink(link);
    });
  });

  sectionCards.forEach(card => {
    card.addEventListener('click', () => {
      const section = card.dataset.section;
      showSection(section);
    });
  });
}

function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  // Show target section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.classList.add('fade-in-up');
    
    // Update current section
    currentSection = sectionName;
    
    // Update nav active state
    updateActiveNavLink();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateActiveNavLink(activeLink = null) {
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.classList.remove('active');
  });
  
  if (activeLink) {
    activeLink.classList.add('active');
  } else {
    const currentLink = document.querySelector(`[data-section="${currentSection}"]`);
    if (currentLink) {
      currentLink.classList.add('active');
    }
  }
}

// Theme Toggle
function setupThemeToggle() {
  // console.log("Running setupThemeToggle - currently bypassed"); // Debug
  // return; // Bypassing this function for now // Restoring function
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');
  
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode = savedTheme === 'dark';
  } else {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();

  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    applyTheme();
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });

  function applyTheme() {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-color-scheme', 'dark');
      icon.className = 'fas fa-sun';
    } else {
      document.documentElement.setAttribute('data-color-scheme', 'light');
      icon.className = 'fas fa-moon';
    }
  }
}

// Back to Top Button
function setupBackToTop() {
  // console.log("Running setupBackToTop - currently bypassed"); // Debug
  // return; // Bypassing this function for now // Restoring function
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Populate Content
function populateContent() {
  // const heroTitle = document.querySelector('#home .hero h1'); // Test removed, this is already correct state
  // if (heroTitle) {
  //   heroTitle.textContent = "TESTING: populateContent was called";
  // }

  populateBenefitsAndRisks();  
  populateSafetyChecklist();
  populateSchoolTools();
  populateCharacteristics();
  initializeCharts();
  initializeQuiz();
  setupControlsSimulator();
  setupLifeSimulator();
  setupComparison();
}

function populateBenefitsAndRisks() {
  const benefitsList = document.getElementById('benefits-list');
  const risksList = document.getElementById('risks-list');

  if (benefitsList) {
    benefitsList.innerHTML = appData.digitalBenefits
      .map(benefit => `<li>${benefit}</li>`)
      .join('');
  }

  if (risksList) {
    risksList.innerHTML = appData.digitalRisks
      .map(risk => `<li>${risk}</li>`)
      .join('');
  }
}

function populateSafetyChecklist() {
  const checklistContainer = document.getElementById('safety-checklist');
  if (!checklistContainer) return;

  checklistContainer.innerHTML = appData.safetyChecklist
    .map((item, index) => `
      <div class="checklist-item" data-index="${index}">
        <input type="checkbox" id="check-${index}" />
        <label for="check-${index}">${item}</label>
      </div>
    `).join('');

  // Add event listeners for progress tracking
  const checkboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateSafetyProgress);
  });
}

function updateSafetyProgress() {
  const checkboxes = document.querySelectorAll('#safety-checklist input[type="checkbox"]');
  const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
  const total = checkboxes.length;
  const percentage = Math.round((completed / total) * 100);

  const progressFill = document.getElementById('safety-progress');
  const progressText = document.getElementById('progress-text');

  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `${percentage}%`;

  // Update completed items styling
  checkboxes.forEach((checkbox, index) => {
    const item = checkbox.closest('.checklist-item');
    if (checkbox.checked) {
      item.classList.add('completed');
    } else {
      item.classList.remove('completed');
    }
  });
}

function populateSchoolTools() {
  const toolsGrid = document.getElementById('tools-grid');
  if (!toolsGrid) return;

  toolsGrid.innerHTML = appData.schoolTools
    .map(tool => `
      <div class="tool-item">
        <i class="${tool.icon}"></i>
        <h4>${tool.name}</h4>
        <p>${tool.desc}</p>
      </div>
    `).join('');
}

function populateCharacteristics() {
  const characteristicsGrid = document.getElementById('characteristics-grid');
  if (!characteristicsGrid) return;

  characteristicsGrid.innerHTML = appData.technoAdolescentCharacteristics
    .map(char => `
      <div class="characteristic-item">
        <i class="${char.icon}"></i>
        <h4>${char.title}</h4>
        <p>${char.desc}</p>
      </div>
    `).join('');
}

// Charts
function initializeCharts() {
  initializeScreenTimeChart();
  initializeCompetencesChart();
}

function initializeScreenTimeChart() {
  if (typeof Chart !== 'function') {
    console.error("Chart.js is not loaded. Skipping screenTimeChart initialization.");
    const chartContainer = document.getElementById('screenTimeChart');
    if (chartContainer) {
      chartContainer.parentElement.innerHTML = "<p style='color:red; text-align:center;'>Erro ao carregar gráfico de tempo de ecrã.</p>";
    }
    return;
  }
  const ctx = document.getElementById('screenTimeChart');
  if (!ctx) return;

  const ages = Object.keys(appData.screenTimeRecommendations);
  const times = Object.values(appData.screenTimeRecommendations).map(time => {
    const match = time.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ages,
      datasets: [{
        label: 'Tempo Recomendado (horas)',
        data: times,
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false, // ANIMAÇÃO DESATIVADA
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        title: {
          display: true,
          text: 'Recomendações de Tempo de Ecrã por Idade',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: '#1FB8CD',
          borderWidth: 1,
          callbacks: {
            afterBody: function(context) {
              const index = context[0].dataIndex;
              return Object.values(appData.screenTimeRecommendations)[index];
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 3,
          title: {
            display: true,
            text: 'Horas por dia',
            font: {
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Faixas Etárias',
            font: {
              weight: 'bold'
            }
          },
          grid: {
            display: false
          }
        }
      }
      // O bloco animation: { duration: 1000, easing: 'easeOutQuart' } foi removido e substituído por animation: false
    }
  });
}

function initializeCompetencesChart() {
  if (typeof Chart !== 'function') {
    console.error("Chart.js is not loaded. Skipping competencesChart initialization.");
    const chartContainer = document.getElementById('competencesChart');
    if (chartContainer) {
      chartContainer.parentElement.innerHTML = "<p style='color:red; text-align:center;'>Erro ao carregar gráfico de competências.</p>";
    }
    return;
  }
  const ctx = document.getElementById('competencesChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: appData.digitalCompetences,
      datasets: [{
        data: [100, 95, 90, 85, 88, 92],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverBorderWidth: 5,
        hoverBorderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false, // ANIMAÇÃO DESATIVADA
      plugins: {
        title: {
          display: true,
          text: 'Competências Digitais Essenciais',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: '#1FB8CD',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}% de importância`;
            }
          }
        }
      }
      // O bloco animation: { animateRotate: true, duration: 1500 } foi removido e substituído por animation: false
    }
  });
}

// Improved Quiz
function initializeQuiz() {
  currentQuizQuestion = 0;
  quizScore = 0;
  quizAnswered = false;
  displayQuizQuestion();
  
  const nextBtn = document.getElementById('quiz-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', nextQuizQuestion);
  }
}

function displayQuizQuestion() {
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const resultEl = document.getElementById('quiz-result');
  const nextBtn = document.getElementById('quiz-next');

  if (!questionEl || currentQuizQuestion >= appData.quizQuestions.length) return;

  const question = appData.quizQuestions[currentQuizQuestion];
  
  // Update question display with progress
  questionEl.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <span>Pergunta ${currentQuizQuestion + 1} de ${appData.quizQuestions.length}</span>
      <div style="background: var(--color-secondary); padding: 4px 12px; border-radius: 20px; font-size: 12px;">
        Pontuação: ${quizScore}/${currentQuizQuestion}
      </div>
    </div>
    <div style="font-size: 18px; font-weight: 500;">${question.question}</div>
  `;
  
  resultEl.classList.remove('show');
  nextBtn.style.display = 'none';
  quizAnswered = false;

  optionsEl.innerHTML = question.options
    .map((option, index) => `
      <div class="quiz-option" data-index="${index}">
        ${option}
      </div>
    `).join('');

  // Add click listeners to options
  optionsEl.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', () => {
      if (!quizAnswered) {
        selectQuizOption(option);
      }
    });
  });
}

function selectQuizOption(selectedOption) {
  const options = document.querySelectorAll('.quiz-option');
  const question = appData.quizQuestions[currentQuizQuestion];
  const selectedIndex = parseInt(selectedOption.dataset.index);
  const resultEl = document.getElementById('quiz-result');
  const nextBtn = document.getElementById('quiz-next');

  quizAnswered = true;

  // Disable all options
  options.forEach(option => {
    option.style.pointerEvents = 'none';
  });

  // Mark correct/incorrect
  options[question.correct].classList.add('correct');
  if (selectedIndex !== question.correct) {
    selectedOption.classList.add('incorrect');
  } else {
    quizScore++;
  }

  // Show result
  const isCorrect = selectedIndex === question.correct;
  resultEl.className = `quiz-result show ${isCorrect ? 'correct' : 'incorrect'}`;
  resultEl.innerHTML = `
    <strong>${isCorrect ? '✓ Correcto!' : '✗ Incorreto!'}</strong><br>
    ${question.explanation}
  `;

  // Update next button
  if (currentQuizQuestion === appData.quizQuestions.length - 1) {
    nextBtn.textContent = 'Ver Resultados';
  } else {
    nextBtn.textContent = 'Próxima Pergunta';
  }
  nextBtn.style.display = 'block';

  // Smooth scroll to result
  setTimeout(() => {
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 300);
}

function nextQuizQuestion() {
  currentQuizQuestion++;
  
  if (currentQuizQuestion >= appData.quizQuestions.length) {
    showQuizResults();
  } else {
    displayQuizQuestion();
  }
}

function showQuizResults() {
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const resultEl = document.getElementById('quiz-result');
  const nextBtn = document.getElementById('quiz-next');

  const percentage = Math.round((quizScore / appData.quizQuestions.length) * 100);
  
  questionEl.innerHTML = `
    <div style="text-align: center;">
      <h3>🎉 Quiz Concluído!</h3>
      <div style="font-size: 48px; margin: 20px 0;">${percentage}%</div>
    </div>
  `;
  
  optionsEl.innerHTML = '';
  
  let message = '';
  let className = 'correct';
  
  if (percentage >= 80) {
    message = '🌟 Excelente! Tem um óptimo conhecimento sobre o uso responsável da tecnologia.';
  } else if (percentage >= 60) {
    message = '👍 Bom trabalho! Continue a aprender sobre tecnologia e educação.';
  } else {
    message = '📚 Continue a explorar! Há muito para aprender sobre o uso equilibrado da tecnologia.';
    className = 'incorrect';
  }
  
  resultEl.className = `quiz-result show ${className}`;
  resultEl.innerHTML = `
    <strong>Resultado Final: ${quizScore}/${appData.quizQuestions.length}</strong><br>
    ${message}
  `;
  
  nextBtn.textContent = 'Reiniciar Quiz';
  nextBtn.onclick = () => {
    initializeQuiz();
    nextBtn.onclick = nextQuizQuestion;
  };
}

// Enhanced Controls Simulator
function setupControlsSimulator() {
  const contentFilter = document.getElementById('content-filter');
  const timeLimit = document.getElementById('time-limit');
  const timeDisplay = document.getElementById('time-display');
  const preview = document.getElementById('control-preview');

  if (!contentFilter || !timeLimit) return;

  function updatePreview() {
    const filter = contentFilter.value;
    const hours = timeLimit.value;
    
    timeDisplay.textContent = `${hours} hora${hours !== '1' ? 's' : ''}`;
    
    const effect = getControlEffect(filter, hours);
    const riskLevel = getRiskLevel(filter, hours);
    
    preview.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h4>⚙️ Configuração Actual</h4>
        <div style="display: grid; gap: 8px; margin: 12px 0;">
          <div><strong>Filtro de Conteúdo:</strong> <span style="color: var(--color-primary);">${filter}</span></div>
          <div><strong>Tempo Diário:</strong> <span style="color: var(--color-primary);">${hours} hora${hours !== '1' ? 's' : ''}</span></div>
        </div>
      </div>
      <div style="padding: 12px; border-radius: 8px; background: ${riskLevel.color}; border-left: 4px solid ${riskLevel.borderColor};">
        <strong>${riskLevel.icon} ${riskLevel.title}</strong><br>
        ${effect}
      </div>
    `;
  }

  function getControlEffect(filter, hours) {
    const hourNum = parseInt(hours);
    
    if (filter === 'Restritivo' && hourNum <= 2) {
      return 'Configuração muito segura, ideal para crianças pequenas. Máxima protecção com supervisão constante.';
    } else if (filter === 'Moderado' && hourNum <= 4) {
      return 'Configuração equilibrada para pré-adolescentes. Boa protecção com alguma autonomia.';
    } else if (filter === 'Básico' && hourNum <= 6) {
      return 'Configuração adequada para adolescentes responsáveis. Protecção básica com mais liberdade.';
    } else if (hourNum > 6) {
      return 'ALERTA: Tempo excessivo detectado. Considere reduzir para promover actividades offline.';
    } else if (filter === 'Desactivado') {
      return 'CUIDADO: Sem protecção activa. Recomenda-se activar pelo menos filtros básicos.';
    } else {
      return 'Configuração standard. Considere ajustar conforme a idade e maturidade da criança.';
    }
  }

  function getRiskLevel(filter, hours) {
    const hourNum = parseInt(hours);
    
    if ((filter === 'Restritivo' && hourNum <= 2) || (filter === 'Moderado' && hourNum <= 4)) {
      return {
        title: 'Configuração Segura',
        icon: '🟢',
        color: 'rgba(33, 128, 141, 0.1)',
        borderColor: 'var(--color-success)'
      };
    } else if (hourNum > 6 || filter === 'Desactivado') {
      return {
        title: 'Requer Atenção',
        icon: '🔴',
        color: 'rgba(192, 21, 47, 0.1)',
        borderColor: 'var(--color-error)'
      };
    } else {
      return {
        title: 'Configuração Moderada',
        icon: '🟡',
        color: 'rgba(168, 75, 47, 0.1)',
        borderColor: 'var(--color-warning)'
      };
    }
  }

  contentFilter.addEventListener('change', updatePreview);
  timeLimit.addEventListener('input', updatePreview);
  
  updatePreview();
}

// Enhanced Life Simulator
function setupLifeSimulator() {
  const onlineTimeSlider = document.getElementById('online-time');
  const onlineDisplay = document.getElementById('online-display');
  const balanceViz = document.getElementById('balance-viz');
  const recommendations = document.getElementById('balance-recommendations');

  if (!onlineTimeSlider) return;

  function updateLifeBalance() {
    const onlineHours = parseInt(onlineTimeSlider.value);
    const offlineHours = 16 - onlineHours; // Assuming 8 hours sleep
    
    onlineDisplay.textContent = `${onlineHours} hora${onlineHours !== 1 ? 's' : ''}`;
    
    // Update visualization
    balanceViz.innerHTML = `
      <div class="online-time" style="flex: ${onlineHours}">
        📱 Online: ${onlineHours}h
      </div>
      <div class="offline-time" style="flex: ${offlineHours}">
        🌍 Offline: ${offlineHours}h
      </div>
    `;
    
    // Update recommendations with detailed feedback
    let recommendation = '';
    let icon = '';
    
    if (onlineHours <= 4) {
      recommendation = 'Excelente equilíbrio! Tempo suficiente para actividades presenciais, exercício, leitura e socialização offline.';
      icon = '🌟';
    } else if (onlineHours <= 6) {
      recommendation = 'Equilíbrio razoável. Considere aumentar actividades presenciais como desporto, hobbies ou tempo em família.';
      icon = '👍';
    } else if (onlineHours <= 8) {
      recommendation = 'Tempo online elevado. Importante criar momentos regulares sem ecrãs para descanso mental e social.';
      icon = '⚠️';
    } else {
      recommendation = 'ALERTA: Tempo online excessivo! Essencial reduzir para prevenir fadiga digital e isolamento social.';
      icon = '🚨';
    }
    
    recommendations.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <span style="font-size: 24px;">${icon}</span>
        <div>
          <strong>Recomendação:</strong><br>
          ${recommendation}
        </div>
      </div>
    `;
  }

  onlineTimeSlider.addEventListener('input', updateLifeBalance);
  updateLifeBalance();
}

// Comparison functionality
function setupComparison() {
  const traditionalBtn = document.getElementById('traditional-btn');
  const digitalBtn = document.getElementById('digital-btn');
  const content = document.getElementById('comparison-content');

  if (!traditionalBtn || !digitalBtn || !content) return;

  const comparisons = {
    traditional: {
      title: '📚 Pedagogia Tradicional',
      points: [
        '👨‍🏫 Ensino centrado no professor',
        '📖 Aprendizagem individual e passiva',
        '📝 Recursos físicos (livros, quadro)',
        '📊 Avaliação formal e padronizada',
        '⏰ Ritmo uniforme para todos os alunos'
      ]
    },
    digital: {
      title: '💻 Pedagogia Digital',
      points: [
        '👥 Aprendizagem colaborativa e interactiva',
        '🎯 Personalização do ensino',
        '🎮 Recursos multimédia e gamificação',
        '📈 Avaliação contínua e formativa',
        '🚀 Ritmo adaptado ao aluno'
      ]
    }
  };

  function showComparison(type) {
    const data = comparisons[type];
    content.innerHTML = `
      <h4>${data.title}</h4>
      <ul style="list-style: none; padding: 0;">
        ${data.points.map(point => `<li style="padding: 8px 0; border-bottom: 1px solid var(--color-border);">${point}</li>`).join('')}
      </ul>
    `;
    
    // Update button states
    traditionalBtn.classList.toggle('btn--primary', type === 'traditional');
    traditionalBtn.classList.toggle('btn--secondary', type !== 'traditional');
    digitalBtn.classList.toggle('btn--primary', type === 'digital');
    digitalBtn.classList.toggle('btn--secondary', type !== 'digital');
  }

  traditionalBtn.addEventListener('click', () => showComparison('traditional'));
  digitalBtn.addEventListener('click', () => showComparison('digital'));
  
  // Show digital by default
  showComparison('digital');
}

// Interactive Elements Setup
function setupInteractiveElements() {
  // Add hover effects and tooltips
  addHoverEffects();
  
  // Setup smooth scrolling for internal links
  setupSmoothScrolling();
}

function addHoverEffects() {
  // Add pulse effect to important cards
  const importantCards = document.querySelectorAll('.section-card, .tool-item, .characteristic-item');
  importantCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('pulse');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('pulse');
    });
  });
}

function setupSmoothScrolling() {
  // Smooth scrolling for any internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}