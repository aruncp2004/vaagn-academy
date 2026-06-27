const COURSES = {
  'ev-master-class': {
    name: 'EV Master Class',
    tag: 'Most Popular',
    tagColor: '#EFF6FF',
    tagText: '#1B3A6B',
    accentColor: '#1B3A6B',
    accentBg: '#EFF6FF',
    icon: 'ti-bolt',
    subtitle: 'Master EV Technology. Build a Career in Electric Mobility.',
    desc: 'Complete EV fundamentals — from electrical basics to full vehicle architecture. Train on real Vaagn vehicles at our Sriperumbudur facility.',
    originalPrice: '₹24,999',
    price: '₹9,999',
    discount: '60% OFF',
    syllabus: [
      { date: '13 July',   lessonNo: '1',  type: 'theory',    module: 'EV Industry & Ecosystem',             topics: 'Global EV Market, Indian EV Market, EV Value Chain, OEM Structure, Suppliers & Ecosystem',                        outcome: 'Understand the complete EV industry landscape' },
      { date: '14 July',   lessonNo: '2',  type: 'theory',    module: 'EV Architecture',                     topics: 'Complete Vehicle Architecture, Power Flow, Energy Flow, High Voltage & Low Voltage Systems',                    outcome: 'Understand how an EV functions as a system' },
      { date: '15 July',   lessonNo: '3',  type: 'theory',    module: 'Electrical Fundamentals for EVs',     topics: 'Voltage, Current, Power, Energy, Series & Parallel Circuits',                                                  outcome: 'Build electrical engineering foundation' },
      { date: '16 July',   lessonNo: '4',  type: 'theory',    module: 'OEM Wiring Diagrams',                 topics: 'Circuit Symbols, Harness Layouts, Connectors, Fuses & Relays',                                                outcome: 'Read and interpret EV schematics' },
      { date: '17 July',   lessonNo: '5',  type: 'theory',    module: 'EV Components Deep Dive',             topics: 'Motor, Controller, Battery Pack, Charger, DC-DC Converter, VCU',                                             outcome: 'Understand major EV subsystems' },
      { date: '18 July',   lessonNo: 'P1', type: 'practical', module: 'Vehicle Walkaround & System Identification', topics: 'Physical identification of EV systems in a live vehicle',                                             outcome: 'Connect theory with actual vehicle components' },
      { date: '20 July',   lessonNo: '6',  type: 'theory',    module: 'Lithium Battery Technologies',        topics: 'LFP, NMC, LTO, Cell Selection Criteria',                                                                     outcome: 'Understand battery chemistries and applications' },
      { date: '21 July',   lessonNo: '7',  type: 'theory',    module: 'Cell Engineering',                    topics: 'Prismatic, Cylindrical & Pouch Cells, Cell Construction',                                                    outcome: 'Learn battery cell fundamentals' },
      { date: '22 July',   lessonNo: '8',  type: 'theory',    module: 'Battery Pack Design',                 topics: 'Series-Parallel Configurations, Voltage & Capacity Calculations',                                            outcome: 'Design basic battery packs' },
      { date: '23 July',   lessonNo: '9',  type: 'theory',    module: 'OEM Battery Manufacturing',           topics: 'Cell Matching, OCV Sorting, IR Sorting, Busbars, Pack Assembly',                                            outcome: 'Learn actual battery pack manufacturing practices' },
      { date: '24 July',   lessonNo: '10', type: 'theory',    module: 'Battery Failure Analysis',            topics: 'Swelling, Thermal Runaway, Connection Failures, Water Ingress',                                              outcome: 'Diagnose battery failures' },
      { date: '25 July',   lessonNo: 'P2', type: 'practical', module: 'Battery Testing Workshop',            topics: 'OCV Testing, IR Testing, Capacity Testing, Cell Matching',                                                   outcome: 'Perform real battery quality checks' },
      { date: '27 July',   lessonNo: '11', type: 'theory',    module: 'Battery Management Systems (BMS)',    topics: 'BMS Architecture, Protection Logic, SOC, SOH, Cell Balancing',                                               outcome: 'Understand battery intelligence systems' },
      { date: '28 July',   lessonNo: '12', type: 'theory',    module: 'BMS Configuration',                   topics: 'Parameters, Protections, Fault Settings, Calibration',                                                       outcome: 'Configure and troubleshoot BMS' },
      { date: '29 July',   lessonNo: '13', type: 'theory',    module: 'Charging Technologies',               topics: 'AC Charging, DC Charging, Charging Standards, CC-CV Method',                                                 outcome: 'Understand charging systems' },
      { date: '30 July',   lessonNo: '14', type: 'theory',    module: 'CAN Communication',                   topics: 'CAN Architecture, Frames, Messages, Diagnostics',                                                            outcome: 'Learn vehicle communication protocols' },
      { date: '31 July',   lessonNo: '15', type: 'theory',    module: 'EV Diagnostics Methodology',          topics: 'No Charging, No Drive, Low Range, Cut-Off Conditions',                                                       outcome: 'Develop fault-finding skills' },
      { date: '1 August',  lessonNo: 'P3', type: 'practical', module: 'Diagnostics & CAN Workshop',          topics: 'CAN Data Reading, Fault Analysis, Charger Diagnostics',                                                      outcome: 'Perform diagnostic procedures' },
      { date: '3 August',  lessonNo: '16', type: 'theory',    module: 'Electric Motors',                     topics: 'BLDC, PMSM, Induction Motors, Motor Characteristics',                                                        outcome: 'Understand EV propulsion systems' },
      { date: '4 August',  lessonNo: '17', type: 'theory',    module: 'Motor Controllers',                   topics: 'PWM, Torque Control, Regenerative Braking',                                                                  outcome: 'Learn controller operation' },
      { date: '5 August',  lessonNo: '18', type: 'theory',    module: 'Vehicle Performance Engineering',     topics: 'Torque, Tractive Effort, Gradeability, Range Estimation',                                                    outcome: 'Analyze vehicle performance' },
      { date: '6 August',  lessonNo: '19', type: 'theory',    module: 'Drivetrain Engineering',              topics: 'Gear Ratios, Differential, Axles, Transmission',                                                             outcome: 'Understand power transmission' },
      { date: '7 August',  lessonNo: '20', type: 'theory',    module: 'Vehicle Validation & Testing',        topics: 'Performance Tests, Efficiency Tests, Validation Procedures',                                                  outcome: 'Learn vehicle testing methodology' },
      { date: '8 August',  lessonNo: 'P4', type: 'practical', module: 'Vehicle Performance Evaluation',      topics: 'Current Measurements, Efficiency Calculations, Road Testing',                                                outcome: 'Analyze real-world vehicle performance' },
      { date: '10 August', lessonNo: '21', type: 'theory',    module: 'EV Manufacturing Systems',            topics: 'Production Flow, Quality Gates, Traceability, Process Control',                                              outcome: 'Understand OEM manufacturing operations' },
      { date: '11 August', lessonNo: '22', type: 'theory',    module: 'Wiring Harness Engineering',          topics: 'Wire Selection, Connector Selection, Harness Design & Protection',                                           outcome: 'Learn harness engineering fundamentals' },
      { date: '12 August', lessonNo: '23', type: 'theory',    module: 'EV Standards & Certification',        topics: 'AIS-156, AIS-038, BIS Requirements, CMVR Overview',                                                          outcome: 'Understand regulatory requirements' },
      { date: '13 August', lessonNo: '24', type: 'theory',    module: 'OEM Failure Investigation',           topics: 'Burnt Controllers, Harness Failures, Battery Failures, Customer Complaints',                                 outcome: 'Learn root cause analysis' },
      { date: '14 August', lessonNo: '25', type: 'theory',    module: 'Industry Readiness & Career Development', topics: 'Resume Building, Interview Preparation, Job Roles & Career Pathways',                                  outcome: 'Become job-ready for EV industry' },
      { date: '15 August', lessonNo: 'P5', type: 'practical', module: 'Final OEM Capstone Project',          topics: 'Battery Inspection, Vehicle Testing, Diagnostics, Technical Presentation',                                   outcome: 'Demonstrate complete EV competency' }
    ],
    prereqs: ['Basic Electrical Knowledge — Understanding of basic circuits helps', 'Interest in Automobiles — A passion for vehicles is all you need'],
    whyCards: [
      { icon: 'ti-building-factory', color: '#D97706', title: 'Learn from EV Manufacturers', desc: 'We don\'t just teach EV — we build them.' },
      { icon: 'ti-car', color: '#1B3A6B', title: 'Train on Real Vehicles', desc: 'Hands-on with Vaagn Beast and Titan EVs.' },
      { icon: 'ti-certificate', color: '#7C3AED', title: 'Industry Certification', desc: 'NSDC aligned certificate.' },
      { icon: 'ti-briefcase', color: '#0F6E56', title: 'Placement Support', desc: 'Direct hiring pipeline to EV companies.' },
      { icon: 'ti-users', color: '#DB2777', title: 'Small Batch Sizes', desc: 'Maximum 15 students per batch.' },
      { icon: 'ti-clock', color: '#D97706', title: 'Flexible Timings', desc: 'Batch A 4:30 PM or Batch B 8:30 PM.' }
    ]
  },
  'battery-technology': {
    name: 'Battery Technology',
    tag: 'High Demand',
    tagColor: '#FEF3C7',
    tagText: '#92400E',
    accentColor: '#D97706',
    accentBg: '#FEF3C7',
    icon: 'ti-battery',
    subtitle: 'Master Battery Technology. Power the Future of EVs.',
    desc: 'Deep dive into lithium-ion technology, BMS, cell balancing and thermal management — the most in-demand EV skill in India right now.',
    originalPrice: '₹24,999',
    price: '₹9,999',
    discount: '60% OFF',
    weeks: [
      {
        label: 'Week 1 (Days 1–7)',
        title: 'Lithium-ion Cell Technology',
        color: '#D97706',
        desc: 'Master the chemistry and construction of lithium-ion cells used in EVs.',
        lessons: ['Electrochemistry Basics','Lithium-ion Cell Types','Cell Specifications & Ratings','Cell Manufacturing Process','Cell Testing Methods','Safety Characteristics','Cell Selection for EVs']
      },
      {
        label: 'Week 2 (Days 8–14)',
        title: 'Battery Pack Design & BMS',
        color: '#1B3A6B',
        desc: 'Learn how cells are assembled into packs and managed by BMS.',
        lessons: ['Series & Parallel Cell Configuration','Pack Architecture Design','BMS Hardware Components','State of Charge Algorithms','State of Health Monitoring','Cell Balancing Methods','Thermal Management Systems']
      },
      {
        label: 'Week 3 (Days 15–21)',
        title: 'Advanced BMS & Safety',
        color: '#7C3AED',
        desc: 'Advanced diagnostics, fault detection and battery safety protocols.',
        lessons: ['Fault Detection & Diagnostics','Battery Safety Standards','High Voltage Safety Protocols','Pack Assembly Hands-on','Testing & Validation','Battery Second Life','Final Assessment']
      }
    ],
    prereqs: ['Basic Electrical Knowledge — Understanding of voltage and current helps', 'Completed EV Master Class or equivalent — recommended but not mandatory'],
    whyCards: [
      { icon: 'ti-battery', color: '#D97706', title: 'Most In-Demand EV Skill', desc: 'Every EV company is hiring battery engineers right now.' },
      { icon: 'ti-building-factory', color: '#1B3A6B', title: 'Real Pack Assembly', desc: 'Assemble actual battery packs in our Vaagn factory lab.' },
      { icon: 'ti-certificate', color: '#7C3AED', title: 'Industry Certification', desc: 'NSDC aligned certificate.' },
      { icon: 'ti-briefcase', color: '#0F6E56', title: 'Placement Support', desc: 'Direct hiring pipeline to EV companies.' },
      { icon: 'ti-shield-check', color: '#DB2777', title: 'Safety Training', desc: 'High voltage safety protocols and certification.' },
      { icon: 'ti-clock', color: '#D97706', title: 'Flexible Timings', desc: 'Batch A 4:30 PM or Batch B 8:30 PM.' }
    ]
  },
  'ev-powertrain': {
    name: 'EV Powertrain',
    tag: 'Technical',
    tagColor: '#EDE9FE',
    tagText: '#6D28D9',
    accentColor: '#7C3AED',
    accentBg: '#EDE9FE',
    icon: 'ti-settings',
    subtitle: 'Master EV Powertrain. Engineer the Drive System.',
    desc: 'Master the complete EV powertrain — motors, controllers, drivetrains, regenerative braking and vehicle dynamics on real Vaagn commercial EVs.',
    originalPrice: '₹24,999',
    price: '₹9,999',
    discount: '60% OFF',
    weeks: [
      {
        label: 'Week 1 (Days 1–7)',
        title: 'EV Motor Technology',
        color: '#7C3AED',
        desc: 'Master the types and operation of motors used in electric vehicles.',
        lessons: ['Introduction to EV Motors','BLDC Motor Principles','PMSM Motor Operation','Induction Motor Basics','Motor Specifications','Torque-Speed Characteristics','Motor Selection for EVs']
      },
      {
        label: 'Week 2 (Days 8–14)',
        title: 'Motor Controllers & Power Electronics',
        color: '#D97706',
        desc: 'Learn how controllers manage motor speed, torque and efficiency.',
        lessons: ['PWM Control Techniques','Three-Phase Inverters','Field Oriented Control','Regenerative Braking Systems','DC-DC Converters','On-Board Charger Systems','Controller Tuning']
      },
      {
        label: 'Week 3 (Days 15–21)',
        title: 'Drivetrain, Testing & Diagnostics',
        color: '#1B3A6B',
        desc: 'Complete vehicle system integration, testing and fault diagnostics.',
        lessons: ['Drivetrain Architecture','Gear Reduction Systems','Vehicle Dynamics','Wiring & CAN Bus','Fault Code Diagnostics','Performance Testing','Final Assessment']
      }
    ],
    prereqs: ['EV Master Class or basic EV knowledge — recommended', 'Understanding of electrical circuits and motors helps'],
    whyCards: [
      { icon: 'ti-settings', color: '#7C3AED', title: 'Real Powertrain Training', desc: 'Train on actual Vaagn EV drivetrains and motors.' },
      { icon: 'ti-car', color: '#1B3A6B', title: 'Real Vehicle Testing', desc: 'Test and diagnose real Vaagn commercial EVs.' },
      { icon: 'ti-certificate', color: '#D97706', title: 'Industry Certification', desc: 'NSDC aligned certificate.' },
      { icon: 'ti-briefcase', color: '#0F6E56', title: 'Placement Support', desc: 'Direct hiring pipeline to EV companies.' },
      { icon: 'ti-cpu', color: '#DB2777', title: 'Power Electronics', desc: 'Learn inverters, converters and controllers hands-on.' },
      { icon: 'ti-clock', color: '#D97706', title: 'Flexible Timings', desc: 'Batch A 4:30 PM or Batch B 8:30 PM.' }
    ]
  },
  'ev-entrepreneurship': {
    name: 'EV Entrepreneurship',
    tag: 'Business',
    tagColor: '#FCE7F3',
    tagText: '#9D174D',
    accentColor: '#DB2777',
    accentBg: '#FCE7F3',
    icon: 'ti-rocket',
    subtitle: 'Start Your EV Business. Build the Future.',
    desc: 'Start your own EV service centre, dealership or battery business. Includes business model, regulatory guidance, ROI planning and live mentorship.',
    originalPrice: '₹24,999',
    price: '₹9,999',
    discount: '60% OFF',
    weeks: [
      {
        label: 'Week 1 (Days 1–7)',
        title: 'EV Industry & Business Models',
        color: '#DB2777',
        desc: 'Understand the EV ecosystem and the business opportunities available.',
        lessons: ['India EV Market Overview','EV Industry Value Chain','Business Models in EV','EV Service Centre Setup','Dealership Operations','Battery Business Models','Regulatory Framework']
      },
      {
        label: 'Week 2 (Days 8–14)',
        title: 'Business Planning & Finance',
        color: '#D97706',
        desc: 'Build your business plan, understand funding and calculate ROI.',
        lessons: ['Business Plan Structure','Capital Requirements','ROI Calculations','Government Schemes & Subsidies','FAME-II Incentives','Bank Loan & MSME Schemes','Financial Projections']
      },
      {
        label: 'Week 3 (Days 15–21)',
        title: 'Launch, Marketing & Mentorship',
        color: '#1B3A6B',
        desc: 'Execute your launch plan, build your brand and get live mentorship.',
        lessons: ['Location & Infrastructure','Hiring & Training Staff','Digital Marketing for EV','Customer Acquisition','Vaagn Dealer Partnership','Live Mentorship Session','Final Business Plan Presentation']
      }
    ],
    prereqs: ['Basic business understanding — helpful but not mandatory', 'Passion for EVs and entrepreneurship — that\'s all you need'],
    whyCards: [
      { icon: 'ti-rocket', color: '#DB2777', title: 'Start Your Own Business', desc: 'Get step-by-step guidance from EV industry experts.' },
      { icon: 'ti-building-factory', color: '#1B3A6B', title: 'Vaagn Dealer Network', desc: 'Opportunity to become a Vaagn Auto dealer partner.' },
      { icon: 'ti-certificate', color: '#7C3AED', title: 'Business Certification', desc: 'NSDC aligned certificate.' },
      { icon: 'ti-currency-rupee', color: '#D97706', title: 'ROI Planning', desc: 'Detailed financial planning and ROI calculations.' },
      { icon: 'ti-users', color: '#0F6E56', title: 'Mentorship Network', desc: 'Connect with EV entrepreneurs and industry leaders.' },
      { icon: 'ti-clock', color: '#DB2777', title: 'Flexible Timings', desc: 'Batch A 4:30 PM or Batch B 8:30 PM.' }
    ]
  }
};