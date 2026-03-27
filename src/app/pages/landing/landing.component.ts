import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  BadgeCheck,
  Bell,
  Blend,
  BookUser,
  Building2,
  CheckCircle2,
  ChartCandlestick,
  ChevronRight,
  ClipboardCheck,
  Database,
  History,
  LayoutTemplate,
  LucideAngularModule,
  Menu,
  MessagesSquare,
  NotebookPen,
  Play,
  Pyramid,
  Rocket,
  Send,
  ShieldCheck,
  Star,
  TriangleAlert,
  Unplug,
  UserPlus,
  X,
} from 'lucide-angular';
import { Subscription } from 'rxjs';
import { ThemeToggleButtonComponent } from '../../shared/components/common/theme-toggle/theme-toggle-button.component';
import { ThemeService } from '../../shared/services/theme.service';

type ThemeMode = 'light' | 'dark';

type NavLink = {
  readonly id: string;
  readonly label: string;
};

type IconCard = {
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly icon: typeof ShieldCheck;
  readonly iconClass: string;
  readonly glowClass: string;
};

type HeroBadge = {
  readonly label: string;
  readonly icon: typeof ShieldCheck;
  readonly shellClass: string;
  readonly desktopClass: string;
};

type JourneyStep = {
  readonly index: string;
  readonly stage: string;
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly icon: typeof ShieldCheck;
  readonly toneClass: string;
};

type PlatformModule = {
  readonly title: string;
  readonly description: string;
  readonly icon: typeof ShieldCheck;
  readonly iconClass: string;
  readonly glowClass: string;
};

type PlatformScreen = {
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly lightSrc: string;
  readonly darkSrc: string;
};

type MetricItem = {
  readonly label: string;
  readonly value: number;
  readonly prefix: string;
  readonly suffix: string;
  displayValue: number;
};

type PlanItem = {
  readonly name: string;
  readonly badge: string;
  readonly description: string;
  readonly amountLabel: string;
  readonly featuredBenefits: readonly string[];
  readonly keyLimits: readonly string[];
  readonly footerLabel: string;
  readonly highlight?: string;
  readonly shellClass: string;
  readonly badgeClass: string;
  readonly statusClass: string;
  readonly buttonClass: string;
};

type TestimonialItem = {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
};

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ThemeToggleButtonComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly themeService = inject(ThemeService);

  private readonly subscriptions = new Subscription();
  private revealObserver?: IntersectionObserver;
  private processStepObserver?: IntersectionObserver;
  private animationFrameIds: number[] = [];
  private processStepElements: HTMLElement[] = [];
  private platformDeckTimer?: ReturnType<typeof setInterval>;

  readonly Menu = Menu;
  readonly X = X;
  readonly ChevronRight = ChevronRight;
  readonly Play = Play;
  readonly Bell = Bell;
  readonly ShieldCheck = ShieldCheck;
  readonly ClipboardCheck = ClipboardCheck;
  readonly CheckCircle2 = CheckCircle2;
  readonly Star = Star;
  readonly currentYear = new Date().getFullYear();

  mobileMenuOpen = false;
  isScrolled = false;
  metricsAnimated = false;
  activeProcessStep = 0;
  activePlatformScreen = 0;
  currentTheme: ThemeMode = 'light';

  readonly navLinks: readonly NavLink[] = [
    { id: 'contexto', label: 'Contexto' },
    { id: 'capacidades', label: 'Solucion' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'plataforma', label: 'Plataforma' },
    { id: 'planes', label: 'Paquetes' },
    { id: 'testimonios', label: 'Testimonios' },
  ];

  readonly heroBadges: readonly HeroBadge[] = [
    {
      label: 'Compliance always-on',
      icon: ShieldCheck,
      shellClass:
        'border-brand-300/70 bg-brand-500/14 text-brand-800 dark:border-brand-500/35 dark:bg-brand-500/12 dark:text-brand-200',
      desktopClass: 'badge-flight-1',
    },
    {
      label: 'Riesgos priorizados',
      icon: Pyramid,
      shellClass:
        'border-amber-300/70 bg-amber-500/14 text-amber-800 dark:border-amber-500/35 dark:bg-amber-500/12 dark:text-amber-200',
      desktopClass: 'badge-flight-2',
    },
    {
      label: 'Evaluaciones activas',
      icon: ClipboardCheck,
      shellClass:
        'border-emerald-300/70 bg-emerald-500/14 text-emerald-800 dark:border-emerald-500/35 dark:bg-emerald-500/12 dark:text-emerald-200',
      desktopClass: 'badge-flight-3',
    },
    {
      label: 'Seguimiento y alertas',
      icon: Bell,
      shellClass:
        'border-sky-300/70 bg-sky-500/14 text-sky-800 dark:border-sky-500/35 dark:bg-sky-500/12 dark:text-sky-200',
      desktopClass: 'badge-flight-4',
    },
    {
      label: 'Certificaciones vivas',
      icon: BadgeCheck,
      shellClass:
        'border-violet-300/70 bg-violet-500/14 text-violet-800 dark:border-violet-500/35 dark:bg-violet-500/12 dark:text-violet-200',
      desktopClass: 'badge-flight-5',
    },
    {
      label: 'Control operativo',
      icon: Building2,
      shellClass:
        'border-slate-300/80 bg-white/80 text-slate-700 dark:border-white/15 dark:bg-white/[0.05] dark:text-slate-200',
      desktopClass: 'badge-flight-6',
    },
  ];

  readonly heroCards: readonly IconCard[] = [
    {
      title: 'Centraliza',
      description:
        'Banco de preguntas, secciones, cuestionarios, certificaciones y seguimiento conectados en una sola capa operativa.',
      detail: 'Gobierno unificado',
      icon: LayoutTemplate,
      iconClass:
        'bg-brand-500/15 text-brand-700 ring-brand-500/20 dark:bg-brand-500/16 dark:text-brand-200',
      glowClass:
        'from-brand-500/18 via-brand-500/0 to-brand-500/0 dark:from-brand-500/14',
    },
    {
      title: 'Visibilidad',
      description:
        'Indicadores ejecutivos, alertas y recomendaciones para ver avance, rezagos y focos de riesgo sin hojas paralelas.',
      detail: 'Senales accionables',
      icon: ChartCandlestick,
      iconClass:
        'bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/16 dark:text-emerald-200',
      glowClass:
        'from-emerald-500/18 via-emerald-500/0 to-emerald-500/0 dark:from-emerald-500/14',
    },
    {
      title: 'Escalable',
      description:
        'Crecimiento por equipos, sedes, clientes o unidades con trazabilidad, responsables y control administrativo.',
      detail: 'Multi area y multisede',
      icon: Rocket,
      iconClass:
        'bg-violet-500/15 text-violet-700 ring-violet-500/20 dark:bg-violet-500/16 dark:text-violet-200',
      glowClass:
        'from-violet-500/18 via-violet-500/0 to-violet-500/0 dark:from-violet-500/14',
    },
  ];

  readonly contextCards: readonly IconCard[] = [
    {
      title: 'Informacion dispersa',
      description:
        'Evaluaciones, evidencias, responsables y avances viven en correos, hojas y archivos aislados que rompen el contexto del proceso.',
      detail: 'Contexto fragmentado',
      icon: Blend,
      iconClass:
        'bg-rose-500/14 text-rose-700 ring-rose-500/20 dark:bg-rose-500/16 dark:text-rose-200',
      glowClass:
        'from-rose-500/20 via-rose-500/0 to-rose-500/0 dark:from-rose-500/14',
    },
    {
      title: 'Seguimiento manual',
      description:
        'Los equipos persiguen pendientes, recordatorios y cierres a mano, lo que consume tiempo operativo y deja huecos en la ejecucion.',
      detail: 'Carga operativa innecesaria',
      icon: TriangleAlert,
      iconClass:
        'bg-red-500/14 text-red-700 ring-red-500/20 dark:bg-red-500/16 dark:text-red-200',
      glowClass:
        'from-red-500/20 via-red-500/0 to-red-500/0 dark:from-red-500/14',
    },
    {
      title: 'Baja visibilidad',
      description:
        'Sin una lectura ejecutiva clara, cuesta detectar rezagos, comparar frentes y entender donde se esta elevando el riesgo o el incumplimiento.',
      detail: 'Lectura parcial del avance',
      icon: Unplug,
      iconClass:
        'bg-rose-600/14 text-rose-700 ring-rose-600/20 dark:bg-rose-600/16 dark:text-rose-200',
      glowClass:
        'from-rose-600/20 via-rose-600/0 to-rose-600/0 dark:from-rose-600/14',
    },
    {
      title: 'Decisiones lentas y sin trazabilidad',
      description:
        'Cuando el historial de acciones no esta conectado, auditar cambios, justificar decisiones y acelerar cierres se vuelve mucho mas dificil.',
      detail: 'Respuesta reactiva',
      icon: History,
      iconClass:
        'bg-amber-500/14 text-amber-700 ring-amber-500/20 dark:bg-amber-500/16 dark:text-amber-200',
      glowClass:
        'from-amber-500/20 via-amber-500/0 to-amber-500/0 dark:from-amber-500/14',
    },
  ];

  readonly capabilities: readonly IconCard[] = [
    {
      title: 'Ordena la operacion desde una sola base',
      description:
        'Centraliza banco de preguntas, secciones, cuestionarios y asignaciones para que cada equipo trabaje sobre una estructura comun.',
      detail: 'Menos hojas paralelas',
      icon: LayoutTemplate,
      iconClass:
        'bg-brand-500/15 text-brand-700 ring-brand-500/20 dark:bg-brand-500/16 dark:text-brand-200',
      glowClass:
        'from-brand-500/16 via-brand-500/0 to-brand-500/0 dark:from-brand-500/12',
    },
    {
      title: 'Activa seguimiento real',
      description:
        'Con responsables, fechas, evidencias y alertas dentro del mismo flujo, el avance deja de depender de correos y recordatorios sueltos.',
      detail: 'Control con ritmo',
      icon: UserPlus,
      iconClass:
        'bg-sky-500/15 text-sky-700 ring-sky-500/20 dark:bg-sky-500/16 dark:text-sky-200',
      glowClass:
        'from-sky-500/16 via-sky-500/0 to-sky-500/0 dark:from-sky-500/12',
    },
    {
      title: 'Reduce dispersion entre frentes',
      description:
        'Reune evaluacion, certificacion, cumplimiento y control administrativo en una sola plataforma operativa y ejecutiva.',
      detail: 'Un solo entorno',
      icon: ChartCandlestick,
      iconClass:
        'bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/16 dark:text-emerald-200',
      glowClass:
        'from-emerald-500/16 via-emerald-500/0 to-emerald-500/0 dark:from-emerald-500/12',
    },
    {
      title: 'Convierte respuestas en lectura ejecutiva',
      description:
        'Transforma actividad y resultados en indicadores, alertas y niveles de riesgo que ayudan a decidir con mayor claridad.',
      detail: 'Visibilidad accionable',
      icon: ClipboardCheck,
      iconClass:
        'bg-violet-500/15 text-violet-700 ring-violet-500/20 dark:bg-violet-500/16 dark:text-violet-200',
      glowClass:
        'from-violet-500/16 via-violet-500/0 to-violet-500/0 dark:from-violet-500/12',
    },
    {
      title: 'Sostiene cumplimiento con trazabilidad',
      description:
        'Cada hallazgo, evidencia, responsable y cierre queda conectado para auditoria, certificacion y mejora continua.',
      detail: 'Rastro verificable',
      icon: BookUser,
      iconClass:
        'bg-amber-500/15 text-amber-700 ring-amber-500/20 dark:bg-amber-500/16 dark:text-amber-200',
      glowClass:
        'from-amber-500/16 via-amber-500/0 to-amber-500/0 dark:from-amber-500/12',
    },
    {
      title: 'Escala sin perder control',
      description:
        'Replica estructuras por cliente, sede o unidad sin romper gobierno, responsables ni seguimiento operativo.',
      detail: 'Crecimiento gobernado',
      icon: Building2,
      iconClass:
        'bg-slate-500/12 text-slate-700 ring-slate-500/20 dark:bg-white/[0.06] dark:text-slate-200',
      glowClass:
        'from-slate-500/16 via-slate-500/0 to-slate-500/0 dark:from-slate-500/10',
    },
  ];

  readonly journeySteps: readonly JourneyStep[] = [
    {
      index: '01',
      stage: 'Base de evaluacion',
      title: 'Estructura el modelo que vas a controlar',
      description:
        'Organiza banco de preguntas, secciones, criterios y ponderaciones para cada proceso, cliente o unidad.',
      detail: 'Todo parte de una base gobernable.',
      icon: NotebookPen,
      toneClass:
        'bg-brand-500/15 text-brand-700 ring-brand-500/20 dark:bg-brand-500/16 dark:text-brand-200',
    },
    {
      index: '02',
      stage: 'Activacion operativa',
      title: 'Asigna y pone en marcha cada frente',
      description:
        'Distribuye cuestionarios y certificaciones con responsables, fechas y alcance visibles desde una sola operacion.',
      detail: 'Cada frente inicia con seguimiento claro.',
      icon: Send,
      toneClass:
        'bg-sky-500/15 text-sky-700 ring-sky-500/20 dark:bg-sky-500/16 dark:text-sky-200',
    },
    {
      index: '03',
      stage: 'Lectura en tiempo real',
      title: 'Da seguimiento y detecta alertas',
      description:
        'Con respuestas, evidencias y avance en curso, el sistema muestra rezagos, alertas y senales de riesgo.',
      detail: 'El control se vuelve visible mientras ocurre.',
      icon: Bell,
      toneClass:
        'bg-amber-500/15 text-amber-700 ring-amber-500/20 dark:bg-amber-500/16 dark:text-amber-200',
    },
    {
      index: '04',
      stage: 'Cierre con trazabilidad',
      title: 'Consolida cumplimiento y decisiones',
      description:
        'Resultados, cumplimiento y acciones quedan conectados para auditoria, certificacion y mejora continua.',
      detail: 'Nada se pierde entre documentos ni responsables.',
      icon: BadgeCheck,
      toneClass:
        'bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/16 dark:text-emerald-200',
    },
  ];

  readonly platformModules: readonly PlatformModule[] = [
    {
      title: 'Banco de preguntas',
      description:
        'Control central de reactivos reutilizables para mantener consistencia sectorial y operativa.',
      icon: Database,
      iconClass:
        'bg-brand-500/15 text-brand-700 ring-brand-500/20 dark:bg-brand-500/16 dark:text-brand-200',
      glowClass:
        'from-brand-500/20 via-brand-500/0 to-brand-500/0 dark:from-brand-500/14',
    },
    {
      title: 'Secciones',
      description:
        'Agrupa criterios, pesos y temas para construir evaluaciones mas claras y mantenibles.',
      icon: LayoutTemplate,
      iconClass:
        'bg-sky-500/15 text-sky-700 ring-sky-500/20 dark:bg-sky-500/16 dark:text-sky-200',
      glowClass:
        'from-sky-500/20 via-sky-500/0 to-sky-500/0 dark:from-sky-500/14',
    },
    {
      title: 'Cuestionarios',
      description:
        'Versiona instrumentos listos para campo, auditoria, compliance o levantamiento operativo.',
      icon: MessagesSquare,
      iconClass:
        'bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/16 dark:text-emerald-200',
      glowClass:
        'from-emerald-500/20 via-emerald-500/0 to-emerald-500/0 dark:from-emerald-500/14',
    },
    {
      title: 'Certificaciones',
      description:
        'Coordina validaciones, estatus y evidencia sin salir de la misma experiencia del producto.',
      icon: BadgeCheck,
      iconClass:
        'bg-violet-500/15 text-violet-700 ring-violet-500/20 dark:bg-violet-500/16 dark:text-violet-200',
      glowClass:
        'from-violet-500/20 via-violet-500/0 to-violet-500/0 dark:from-violet-500/14',
    },
    {
      title: 'Asignaciones',
      description:
        'Dispara cuestionarios por grupo, cliente, sede o responsable con prioridad y fecha objetivo.',
      icon: UserPlus,
      iconClass:
        'bg-amber-500/15 text-amber-700 ring-amber-500/20 dark:bg-amber-500/16 dark:text-amber-200',
      glowClass:
        'from-amber-500/20 via-amber-500/0 to-amber-500/0 dark:from-amber-500/14',
    },
    {
      title: 'Calculadora de riesgos',
      description:
        'Convierte cumplimiento, hallazgos y evidencias en una lectura clara para saber como va la empresa.',
      icon: Pyramid,
      iconClass:
        'bg-slate-500/12 text-slate-700 ring-slate-500/20 dark:bg-white/[0.06] dark:text-slate-200',
      glowClass:
        'from-slate-500/18 via-slate-500/0 to-slate-500/0 dark:from-slate-500/12',
    },
  ];

  readonly platformScreens: readonly PlatformScreen[] = [
    {
      title: 'Banco de preguntas con control reusable',
      eyebrow: 'Base estructural',
      description:
        'Reactivos listos para reutilizar, normalizar criterios y construir evaluaciones con consistencia operativa.',
      lightSrc: '/images/landing/landing_preguntas_white.png',
      darkSrc: '/images/landing/landing_preguntas_dark.png',
    },
    {
      title: 'Secciones listas para modelar cada flujo',
      eyebrow: 'Arquitectura evaluativa',
      description:
        'Agrupa temas, pesos y logica de evaluacion para mantener claridad entre clientes, areas y procesos.',
      lightSrc: '/images/landing/landing_secciones_white.png',
      darkSrc: '/images/landing/landing_secciones_dark.png',
    },
    {
      title: 'Asignaciones visibles para coordinar ejecucion',
      eyebrow: 'Operacion activada',
      description:
        'Distribuye cuestionarios por responsable, grupo o sede sin perder prioridad, fechas objetivo ni seguimiento.',
      lightSrc: '/images/landing/landing_asignacion_white.png',
      darkSrc: '/images/landing/landing_asignacion_dark.png',
    },
    {
      title: 'Evaluaciones activas con lectura de avance',
      eyebrow: 'Seguimiento operativo',
      description:
        'Consulta el estado de cada evaluacion, identifica rezagos y entiende que frente requiere atencion inmediata.',
      lightSrc: '/images/landing/landing_evaluaciones_white.png',
      darkSrc: '/images/landing/landing_evaluaciones_dark.png',
    },
    {
      title: 'Experiencia de respuesta conectada',
      eyebrow: 'Captura en campo',
      description:
        'Responder cuestionarios se integra al mismo flujo de asignacion, evidencia y trazabilidad del resto del sistema.',
      lightSrc: '/images/landing/landing_contestar_white.png',
      darkSrc: '/images/landing/landing_contestar_dark.png',
    },
    {
      title: 'Calificacion con criterio y cierre claro',
      eyebrow: 'Validacion y resultado',
      description:
        'La plataforma consolida respuestas, evidencia y resultado para facilitar revision, calificacion y decisiones.',
      lightSrc: '/images/landing/landing_calificar_white.png',
      darkSrc: '/images/landing/landing_calificar_dark.png',
    },
    {
      title: 'Calculadora de riesgos dentro del mismo recorrido',
      eyebrow: 'Lectura ejecutiva',
      description:
        'Cumplimiento, hallazgos y avance se convierten en una lectura ejecutiva accionable sin salir del producto.',
      lightSrc: '/images/landing/landing_calculadora_white.png',
      darkSrc: '/images/landing/landing_calculadora_dark.png',
    },
  ];

  readonly metrics: MetricItem[] = [
    {
      label: 'evaluaciones gestionadas',
      value: 12840,
      prefix: '',
      suffix: '+',
      displayValue: 0,
    },
    {
      label: 'usuarios coordinados',
      value: 920,
      prefix: '',
      suffix: '+',
      displayValue: 0,
    },
    {
      label: 'asignaciones activas',
      value: 36,
      prefix: '',
      suffix: '',
      displayValue: 0,
    },
    {
      label: 'cumplimiento monitoreado',
      value: 94,
      prefix: '',
      suffix: '%',
      displayValue: 0,
    },
  ];

  readonly plans: readonly PlanItem[] = [
    {
      name: 'Essential',
      badge: 'Base',
      description:
        'Acceso base a Certum360 para centralizar evaluaciones, asignaciones y seguimiento con una operacion ordenada desde el primer despliegue.',
      amountLabel: 'Licenciamiento anual',
      featuredBenefits: [
        'Cuestionarios, secciones y banco de preguntas configurables',
        'Asignaciones con seguimiento visible por responsable y fecha',
        'Alertas base y trazabilidad sobre respuestas, evidencias y cierres',
      ],
      keyLimits: [
        'Operacion inicial con control operativo',
        'Cumplimiento y avance en una sola vista',
      ],
      footerLabel:
        'Pensado para empezar con disciplina operativa sin sobredimensionar la implementacion.',
      shellClass:
        'border-brand-200/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(239,246,255,0.92),rgba(255,255,255,0.9))] dark:border-brand-500/20 dark:bg-[linear-gradient(160deg,rgba(17,24,39,0.96),rgba(37,99,235,0.18),rgba(15,23,42,0.98))]',
      badgeClass:
        'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200',
      statusClass:
        'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300',
      buttonClass:
        'bg-gray-950 text-white hover:bg-brand-600 dark:bg-white dark:text-gray-950 dark:hover:bg-brand-500 dark:hover:text-white',
    },
    {
      name: 'Professional',
      badge: 'Escalable',
      description:
        'La capa mas balanceada para operar Certum360 con mayor visibilidad, cumplimiento activo y lectura ejecutiva sobre riesgo.',
      amountLabel: 'Licenciamiento anual',
      featuredBenefits: [
        'Prioridades, alertas y estado por area, sede o cliente',
        'Seguimiento de cumplimiento, hallazgos y certificaciones en un mismo flujo',
        'Trazabilidad de acciones correctivas y lectura ejecutiva de riesgo',
      ],
      keyLimits: [
        'Escala por area, sede o cliente',
        'Operacion con mas control y seguimiento',
      ],
      footerLabel:
        'La opcion mas balanceada para crecer dentro de la plataforma sin perder claridad operativa.',
      highlight: 'Mas popular',
      shellClass:
        'border-violet-200/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(245,243,255,0.94),rgba(255,255,255,0.9))] dark:border-violet-500/20 dark:bg-[linear-gradient(160deg,rgba(17,24,39,0.96),rgba(109,40,217,0.22),rgba(15,23,42,0.98))]',
      badgeClass:
        'border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300',
      statusClass:
        'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300',
      buttonClass:
        'bg-gray-950 text-white hover:bg-violet-600 dark:bg-white dark:text-gray-950 dark:hover:bg-violet-500 dark:hover:text-white',
    },
    {
      name: 'Enterprise',
      badge: 'Corporativo',
      description:
        'Cobertura corporativa para ecosistemas multiunidad que requieren gobierno, segmentacion operativa y trazabilidad transversal.',
      amountLabel: 'Licenciamiento anual',
      featuredBenefits: [
        'Gobierno por unidades, sedes o clientes con visibilidad consolidada',
        'Control avanzado de riesgos, cumplimiento y certificaciones',
        'Seguimiento corporativo con trazabilidad completa para auditoria y expansion',
      ],
      keyLimits: [
        'Escala corporativa con lectura consolidada',
        'Operacion avanzada para multiples equipos',
      ],
      footerLabel:
        'Preparado para despliegues con mayor complejidad, volumen y necesidad de control transversal.',
      shellClass:
        'border-amber-200/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(255,251,235,0.94),rgba(255,255,255,0.9))] dark:border-amber-500/20 dark:bg-[linear-gradient(160deg,rgba(17,24,39,0.96),rgba(146,64,14,0.2),rgba(15,23,42,0.98))]',
      badgeClass:
        'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300',
      statusClass:
        'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300',
      buttonClass:
        'bg-gray-950 text-white hover:bg-amber-600 dark:bg-white dark:text-gray-950 dark:hover:bg-amber-500 dark:hover:text-gray-950',
    },
  ];

  readonly testimonials: readonly TestimonialItem[] = [
    {
      quote:
        'Teniamos evaluaciones y pendientes repartidos en varias hojas. Con Certum360 hoy vemos responsables, alertas y seguimiento en una sola lectura operativa.',
      name: 'Maria Fernanda Rios',
      role: 'Directora de Operaciones',
      company: 'Grupo Axiona',
    },
    {
      quote:
        'La direccion recibe una lectura ejecutiva de cumplimiento y riesgo sin pedir reportes aparte. Eso nos ayudo a ordenar sedes, prioridades y cierres con mas criterio.',
      name: 'Javier Solano',
      role: 'Gerente de Compliance',
      company: 'Nortia Industrial',
    },
    {
      quote:
        'Centralizar cuestionarios, evidencias y certificaciones nos dio trazabilidad real. Ahora cada evaluacion tiene contexto, seguimiento y fecha clara de cierre.',
      name: 'Paula Castaneda',
      role: 'Lider de Mejora Continua',
      company: 'Vertex Salud Corporativa',
    },
    {
      quote:
        'Lo mas util fue la priorizacion. Sabemos que evaluacion esta detenida, que riesgo subio y que responsable debe actuar antes de escalar el problema.',
      name: 'Ricardo Mena',
      role: 'Director Comercial',
      company: 'Nova Integracion',
    },
    {
      quote:
        'Para auditoria interna cambio por completo la conversacion: cada respuesta, evidencia y accion correctiva queda trazable y lista para seguimiento o certificacion.',
      name: 'Daniela Paredes',
      role: 'Head of Quality',
      company: 'Orbis Logistica',
    },
  ];

  readonly testimonialRail = [...this.testimonials, ...this.testimonials];

  constructor() {
    this.subscriptions.add(
      this.themeService.theme$.subscribe((theme) => {
        this.currentTheme = theme;
      }),
    );

    this.themeService.setTheme(
      (localStorage.getItem('theme') as ThemeMode | null) ?? 'light',
    );
  }

  get dashboardImageSrc(): string {
    return this.currentTheme === 'dark'
      ? '/images/landing/dashboard_dark.png'
      : '/images/landing/dashboard_white.png';
  }

  get activePlatformSlide(): PlatformScreen {
    return this.platformScreens[this.activePlatformScreen] ?? this.platformScreens[0];
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 16;
    this.updateActiveProcessStep();
  }

  ngAfterViewInit(): void {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealTargets = Array.from(
      (this.host.nativeElement as HTMLElement).querySelectorAll('[data-reveal]'),
    ) as HTMLElement[];

    this.initializeProcessSteps(reduceMotion);
    this.initializePlatformDeck(reduceMotion);

    if (reduceMotion) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));

      if (!this.metricsAnimated) {
        this.metricsAnimated = true;
        this.startMetricAnimation();
      }

      return;
    }

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          element.classList.add('is-visible');

          if (element.dataset['metrics'] === 'true' && !this.metricsAnimated) {
            this.metricsAnimated = true;
            this.startMetricAnimation();
          }

          this.revealObserver?.unobserve(element);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealTargets.forEach((element) => this.revealObserver?.observe(element));
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.processStepObserver?.disconnect();
    this.animationFrameIds.forEach((id) => cancelAnimationFrame(id));
    if (this.platformDeckTimer) {
      clearInterval(this.platformDeckTimer);
    }
    this.subscriptions.unsubscribe();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  formatMetric(metric: MetricItem): string {
    return `${metric.prefix}${Math.round(metric.displayValue).toLocaleString(
      'es-MX',
    )}${metric.suffix}`;
  }

  initials(fullName: string): string {
    const [first = '', second = ''] = fullName.split(' ');
    return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
  }

  setActivePlatformScreen(index: number): void {
    if (index < 0 || index >= this.platformScreens.length) {
      return;
    }

    this.activePlatformScreen = index;
  }

  platformScreenshotSrc(screen: PlatformScreen): string {
    return this.currentTheme === 'dark' ? screen.darkSrc : screen.lightSrc;
  }

  platformScreenshotState(index: number): string {
    const order = this.getPlatformScreenOrder(index);

    if (order === 0) {
      return 'front';
    }

    if (order === 1) {
      return 'second';
    }

    if (order === 2) {
      return 'third';
    }

    if (order === 3) {
      return 'fourth';
    }

    return 'hidden';
  }

  platformScreenshotZIndex(index: number): number {
    const order = this.getPlatformScreenOrder(index);
    return Math.max(0, this.platformScreens.length - order);
  }

  private startMetricAnimation(): void {
    const duration = 2200;

    this.metrics.forEach((metric, index) => {
      const start = performance.now();

      const tick = (timestamp: number) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        this.metrics[index] = {
          ...metric,
          displayValue: metric.value * eased,
        };

        if (progress < 1) {
          this.animationFrameIds[index] = requestAnimationFrame(tick);
        }
      };

      this.animationFrameIds[index] = requestAnimationFrame(tick);
    });
  }

  private initializeProcessSteps(reduceMotion: boolean): void {
    this.processStepElements = Array.from(
      (this.host.nativeElement as HTMLElement).querySelectorAll('[data-process-step]'),
    ) as HTMLElement[];

    if (!this.processStepElements.length) {
      return;
    }

    this.updateActiveProcessStep();

    if (reduceMotion || typeof window === 'undefined') {
      this.activeProcessStep = 0;
      return;
    }

    this.processStepObserver = new IntersectionObserver(
      () => this.updateActiveProcessStep(),
      {
        threshold: [0, 0.08, 0.18, 0.32],
        rootMargin: '14% 0px 16% 0px',
      },
    );

    this.processStepElements.forEach((element) =>
      this.processStepObserver?.observe(element),
    );
  }

  private updateActiveProcessStep(): void {
    if (typeof window === 'undefined' || !this.processStepElements.length) {
      return;
    }

    const viewportAnchor = window.innerHeight * 0.3;
    const candidates = this.processStepElements.filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > window.innerHeight * 0.06 && rect.top < window.innerHeight * 0.9;
    });

    const activePool = candidates.length ? candidates : this.processStepElements;
    let nextActiveStep = this.activeProcessStep;
    let closestDistance = Number.POSITIVE_INFINITY;

    activePool.forEach((element, fallbackIndex) => {
      const rect = element.getBoundingClientRect();
      const stepFocusPoint = rect.top + rect.height * 0.22;
      const distance = Math.abs(stepFocusPoint - viewportAnchor);
      const elementIndex = Number(element.dataset['processStep'] ?? fallbackIndex);

      if (distance < closestDistance) {
        closestDistance = distance;
        nextActiveStep = elementIndex;
      }
    });

    this.activeProcessStep = nextActiveStep;
  }

  private initializePlatformDeck(reduceMotion: boolean): void {
    if (
      reduceMotion ||
      typeof window === 'undefined' ||
      this.platformScreens.length < 2
    ) {
      return;
    }

    this.platformDeckTimer = window.setInterval(() => {
      this.activePlatformScreen =
        (this.activePlatformScreen + 1) % this.platformScreens.length;
    }, 3600);
  }

  private getPlatformScreenOrder(index: number): number {
    return (
      index -
      this.activePlatformScreen +
      this.platformScreens.length
    ) % this.platformScreens.length;
  }
}
