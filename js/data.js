// All site content lives here — a single source of truth for prices,
// services and contact details, taken from the current liffeymedical.ie.

const IMG = 'https://images.squarespace-cdn.com/content/v1/5dc70fc8827e992c23d016a3';
const ACUITY = 'https://liffeymedical.as.me';

export const clinic = {
  name: 'Liffey Medical',
  phone: '(01) 865 6969',
  phoneHref: 'tel:+35318656969',
  email: 'info@liffeymedical.ie',
  addressLines: ['8A Little Britain Street', '(Off Capel Street), Smithfield', 'Dublin 7, D07 NY18'],
  addressText: '8A Little Britain Street, Smithfield, Dublin 7, D07 NY18',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=8A+Little+Britain+Street+Smithfield+Dublin+7+D07+NY18',
  mapEmbed: 'https://www.google.com/maps?q=8A+Little+Britain+Street,+Dublin+7,+D07+NY18&z=16&output=embed',
  outOfHours: { name: 'NorthDoc', phone: '1850 224477', href: 'tel:1850224477' },
  officialSite: 'https://www.liffeymedical.ie',
};

export const images = {
  bridge: `${IMG}/1632675077960-NSGONAXMBH1CQPESJ3PF/Ha+Penny+Coulourful+-+best.jpg?format=1500w`,
  drTim: `${IMG}/0305ab2b-be6f-4142-9589-0c536d53ba7b/7B47B416-F301-4386-8682-2206759C72FE.jpg?format=750w`,
  isabella: `${IMG}/78bc1f51-bde6-46dc-a70f-79c08da14e1f/IMG_3097.jpg?format=750w`,
  bloods: `${IMG}/1599417910438-5ZDPSP2R5LE9U22HKT8I/LIffey+Medical+-+blood+tests+in+Dublin+city+centre?format=1000w`,
  sti: `${IMG}/1630265954285-43CZ9L6BOC3TD7A58DE5/STI+4.jpg?format=1000w`,
  visa: `${IMG}/7e0514ec-a619-408d-abfd-63f3a0a2eafa/visa-medicals.jpg?format=1000w`,
};

// Online booking (Acuity Scheduling) — the same calendars the current site embeds.
export const booking = {
  gp: { label: 'GP consultation — in clinic', short: 'GP consultation', price: '€75', icon: 'stethoscope', url: `${ACUITY}/physical`, note: 'No deposit required. You don’t need to be registered to book your first appointment.' },
  phone: { label: 'GP consultation — by phone', short: 'Phone consultation', price: '€75', icon: 'phoneCall', url: `${ACUITY}/phone`, note: 'Some evening availability.' },
  schemes: { label: 'Medical card / EHIC consultation', short: 'Medical card / EHIC', price: 'Scheme', icon: 'card', url: `${ACUITY}/fluvaccine`, note: 'For medical cards registered to our practice and eligible EHIC holders.' },
  bloods: { label: 'Blood tests', short: 'Blood tests', price: 'from €80', icon: 'droplet', url: `${ACUITY}/bloods`, note: 'No referral needed. Results by phone with our doctor.' },
  bloodsComplete: { label: 'Complete blood test', short: 'Complete blood test', price: '€120', icon: 'droplet', url: `${ACUITY}/?appointmentType=23827910`, note: 'Our most comprehensive blood profile.' },
  bloodsFertility: { label: 'Day 3 or Day 21 fertility bloods', short: 'Fertility bloods', price: '€90', icon: 'droplet', url: `${ACUITY}/?appointmentType=24347963`, note: 'Book the day that matches your cycle.' },
  bloodsImmunity: { label: 'Pre-employment immunity bloods', short: 'Pre-employment immunity', price: '€120', icon: 'briefcase', url: `${ACUITY}/?appointmentType=24348831`, note: 'We provide the lab reports for your employer.' },
  sti: { label: 'Sexual health & STI screening', short: 'STI screening', price: 'from €80', icon: 'shield', url: `${ACUITY}/stitesting`, note: 'Confidential. Rapid HIV results in 20 minutes.' },
  prep: { label: 'PrEP consultation', short: 'PrEP consultation', price: '€130', icon: 'pill', url: `${ACUITY}/?appointmentType=37952725`, note: 'Includes STI screen, kidney function test and prescription fee.' },
  visa: { label: 'Visa medical (30 minutes)', short: 'Visa medical', price: 'from €320', icon: 'plane', url: `${ACUITY}/schedule.php?appointmentType=16077566`, note: 'A €130 deposit is required to secure this booking.' },
  flu: { label: 'Flu vaccine', short: 'Flu vaccine', price: 'Seasonal', icon: 'syringe', url: `${ACUITY}/fluvaccine`, note: 'Flu vaccines available from 23rd September.' },
};

export const bookingGroups = [
  { title: 'See a doctor', keys: ['gp', 'phone', 'schemes'] },
  { title: 'Tests & clinics', keys: ['bloods', 'sti', 'prep'] },
  { title: 'Medicals & vaccines', keys: ['visa', 'flu'] },
];

export const announcement = {
  id: 'flu-2026',
  text: 'Flu vaccines available from 23rd September.',
  cta: 'Book your flu vaccine',
  book: 'flu',
};

export const nav = [
  { label: 'GP Appointments', href: '#/gp-appointments', path: 'gp-appointments' },
  {
    label: 'Services', path: ['blood-tests', 'sexual-health', 'prep', 'visa-medicals'], children: [
      { label: 'Blood Test Clinic', href: '#/blood-tests', icon: 'droplet', desc: 'Doctor-led, no referral needed', price: 'from €80' },
      { label: 'Sexual Health & STI Clinic', href: '#/sexual-health', icon: 'shield', desc: 'Confidential, rapid HIV results', price: 'from €80' },
      { label: 'PrEP Service', href: '#/prep', icon: 'pill', desc: 'Free medication for eligible patients', price: '€130' },
      { label: 'Visa Medicals', href: '#/visa-medicals', icon: 'plane', desc: 'Tailored to your destination', price: 'from €320' },
    ],
  },
  { label: 'Price List', href: '#/prices', path: 'prices' },
  { label: 'About & Contact', href: '#/about', path: 'about' },
];

export const quickServices = [
  { title: 'GP consultation', price: '€75', icon: 'stethoscope', href: '#/gp-appointments', text: 'See a doctor in our city-centre clinic. New patients welcome — no registration needed.' },
  { title: 'Phone consultation', price: '€75', icon: 'phoneCall', href: '#/gp-appointments/phone', text: 'Speak with a GP by phone, with some evening availability.' },
  { title: 'Blood tests', price: 'from €80', icon: 'droplet', href: '#/blood-tests', text: 'Doctor-led blood test clinic. No referral needed and results by phone with our doctor.' },
  { title: 'Sexual health & STI', price: 'from €80', icon: 'shield', href: '#/sexual-health', text: 'Friendly, thorough and confidential screening, with rapid HIV results in 20 minutes.' },
  { title: 'PrEP service', price: '€130', icon: 'pill', href: '#/prep', text: 'Includes STI screen, kidney function test and prescription fee.' },
  { title: 'Visa medicals', price: 'from €320', icon: 'plane', href: '#/visa-medicals', text: 'Tailored to your destination, with bloods, ECG and exam done on-site.' },
  { title: 'Medical card & EHIC', price: 'Scheme', icon: 'card', href: '#/gp-appointments/schemes', text: 'Book a Medical Card Consultation or an EHIC Consultation.' },
  { title: 'Full price list', price: 'All fees', icon: 'tag', href: '#/prices', text: 'Clear, upfront fees for every service we offer.' },
];

export const feesAtAGlance = [
  ['Doctor consultation', '€75'],
  ['Full STI screen', '€120'],
  ['Complete blood test', '€120'],
  ['PrEP consultation', '€130', 'Includes STI screen, kidney function test and prescription fee'],
  ['Weight-loss consultation', '€75'],
  ['Weight-loss consultation with bloods', '€150'],
  ['Ear syringing', '€80'],
  ['Visa medicals', 'from €320'],
  ['Social welfare / IB1 / illness benefit forms', 'Issued'],
];

export const aboutPillars = [
  { icon: 'mapPin', title: 'Central location', text: 'Liffey Medical GP practice is in Dublin’s city centre, located just off Capel Street and minutes from Henry Street.' },
  { icon: 'users', title: 'Experienced doctors and a professional team', text: 'Our doctors provide expert GP healthcare across the full range of general practice — from doctor appointments and diagnostic testing to treatment and/or referrals — in a comfortable and caring environment.' },
  { icon: 'activity', title: 'Up to date', text: 'Up to date with the latest treatments and testing.' },
];

export const serviceAreas = [
  {
    id: 'general', icon: 'stethoscope', title: 'General Practice', href: '#/gp-appointments', book: 'gp',
    text: 'We offer all the usual general practice and family medicine services, including acute and chronic illness management (asthma, COPD, hypertension, diabetes etc). Whether you want to see a doctor in Dublin because you are sick, need specific medical advice, or simply would like to be healthier, we can help you.',
    tags: ['Asthma', 'COPD', 'Hypertension', 'Diabetes', 'Family medicine'],
  },
  {
    id: 'bloods', icon: 'droplet', title: 'Blood Test Clinic', href: '#/blood-tests', book: 'bloods',
    text: 'We offer a wide range of blood diagnostics including Full Blood Count (FBC), Liver Function tests, Kidney Function, Lipid Screen (Cholesterol), HbA1c (screening for blood sugar and diabetes), Calcium, Thyroid bloods and Iron Status, Female Hormone bloods for Menopause and Fertility, Day 21 progesterone, AMH, HCG, PSA and Prostate Health Index (PHI).',
    tags: ['FBC', 'Cholesterol', 'HbA1c', 'Thyroid', 'Fertility', 'PSA & PHI'],
  },
  {
    id: 'derm', icon: 'scan', title: 'Primary Care Dermatology', book: 'gp',
    text: 'Skin conditions are the most common reason for patients to present in primary care. We can help with dermatitis, acne, rosacea, eczema, psoriasis, skin rashes, allergic reactions as well as lumps and bumps on the skin such as moles and other lesions.',
    tags: ['Acne', 'Eczema', 'Psoriasis', 'Rosacea', 'Moles & lesions'],
  },
  {
    id: 'sexual', icon: 'shield', title: 'Sexual Health', href: '#/sexual-health', book: 'sti',
    text: 'Liffey Medical has a friendly, thorough and confidential STI screening service. Our standard STI screen includes Chlamydia, Gonorrhoea, Syphilis, HIV, Hepatitis B and Hepatitis C. Cost of our standard screen is €120. A blood and urine sample is required. Genital Herpes and Genital Warts are assessed for at clinical examination.',
    tags: ['Full screen €120', 'Rapid HIV', 'PrEP', 'Confidential'],
  },
  {
    id: 'men', icon: 'mars', title: 'Men’s Health', book: 'gp',
    text: 'At Liffey Medical, we provide for the full spectrum of men’s medical concerns including conditions such as heart disease, prostate and testicular cancer screening, PSA blood test, PHI test, testosterone testing, preventative health care, chronic disease management and sexual issues including erectile dysfunction.',
    tags: ['Heart health', 'PSA & PHI', 'Testosterone', 'Preventative care'],
  },
  {
    id: 'other', icon: 'clipboard', title: 'Other Services', href: '#/prices', book: 'gp',
    text: 'A sample of some of the other services we offer include treatment of sports injuries, minor trauma care, mental health consultations, medicals for visa, insurance and pre-employment and driving licence, social welfare cert request and medical check ups.',
    tags: ['Sports injuries', 'Mental health', 'Driving licence', 'Weight loss', 'Ear syringing'],
  },
];

export const faqs = [
  { q: 'Do I need to be registered with Liffey Medical to book?', a: 'No. You don’t need to be registered in order to make your first appointment — new patients are always welcome.' },
  { q: 'Is there a deposit?', a: 'No deposit is required for GP consultations. Visa medicals require a €130 deposit to secure the booking.' },
  { q: 'Can I walk in without an appointment?', a: 'We operate by appointment only and do not accept walk-ins. Book online, or phone reception on (01) 865 6969.' },
  { q: 'Do I need a referral for blood tests or STI screening?', a: 'No referral is needed for our blood test clinic or our STI service, and you don’t need to be a registered patient. Blood tests are available to those aged 15+.' },
  { q: 'How will I get my test results?', a: 'Blood test results are provided by a follow-up phone call with our doctor, and we’ll also email you a copy of your lab results. There is no additional consultation charge. Rapid HIV results are ready in 20 minutes, while you wait.' },
  { q: 'Do you accept medical cards and EHIC?', a: 'Yes. If your medical card is registered to our practice, book a Medical Card Consultation. Patients with an eligible European Health Insurance Card can book an EHIC Consultation.' },
  { q: 'Can I email a medical question?', a: 'Please don’t — medical queries must be discussed at your consultation. Email is for administrative queries only and is read during normal working hours.' },
  { q: 'What is your cancellation policy?', a: 'All cancellations incur a €15 admin fee. Late cancellations (less than 24 hours before your appointment — 5pm Friday for Monday appointments) incur a fee of 50% of the consultation fee.' },
  { q: 'Can I claim on my health insurance?', a: 'Some services might be reimbursable from your health insurance — the amount depends on your individual policy. We’ll issue a receipt on request so you can claim expenses. An admin charge may apply for receipts more than three months old.' },
  { q: 'What should I do outside clinic hours?', a: 'Contact NorthDoc on 1850 224477 in the event of an emergency outside our clinic hours. In a life-threatening emergency, call 999 or 112.' },
];

export const bloodCategories = [
  { id: 'all', label: 'All tests' },
  { id: 'general', label: 'General health' },
  { id: 'women', label: 'Women’s health & fertility' },
  { id: 'men', label: 'Men’s health' },
  { id: 'work', label: 'Work, travel & screening' },
];

export const bloodTests = [
  {
    id: 'complete', name: 'Complete Blood Test', price: 120, cat: 'general', popular: true, book: 'bloodsComplete',
    text: 'Our most comprehensive profile — a broad check of your general health in a single sample.',
    groups: [
      ['Full Blood Count', ['White Blood Cells', 'Red Blood Cells', 'Haemoglobin', 'Platelets']],
      ['Liver function', ['Total Protein', 'Albumin', 'Globulin', 'Bilirubin', 'Alkaline Phosphatase', 'Gamma-GT']],
      ['Lipid profile', ['Total Cholesterol', 'Fasting Triglyceride', 'LDL-Cholesterol', 'HDL-Cholesterol', 'non HDL-Cholesterol']],
      ['Kidney (renal) function', ['Sodium', 'Potassium', 'Chloride', 'Total CO2', 'Urea', 'Creatinine', 'Anion Gap', 'eGFR']],
      ['Blood sugar', ['Glucose', 'HbA1c']],
      ['Bone profile', ['Albumin', 'Calcium', 'Corrected Calcium', 'Phosphate', 'Alkaline Phosphatase']],
      ['Inflammation', ['CRP (C-Reactive Protein)']],
      ['Thyroid function', ['TSH', 'Free T4']],
      ['Iron studies', ['Iron', 'Transferrin', 'Transferrin Saturation', 'Folate', 'Ferritin']],
    ],
  },
  {
    id: 'female-hormone', name: 'Female Fertility / Female Hormone Blood Test', price: 90, cat: 'women', book: 'bloods',
    groups: [['Included', ['FSH (Follicle Stimulating Hormone)', 'LH (Luteinising Hormone)', 'Oestradiol', 'TSH (Thyroid Stimulating Hormone)', 'Testosterone', 'Free T4']]],
  },
  {
    id: 'thyroid', name: 'Thyroid Bloods', price: 80, cat: 'general', book: 'bloods',
    groups: [['Included', ['TSH (Thyroid Stimulating Hormone)', 'Free T4']]],
    extra: 'Anti Thyroglobulin (TG) Abs — €60 extra, if required.',
  },
  {
    id: 'day2-5', name: 'Days 2 to 5 of Cycle Bloods & Consultation', price: 90, cat: 'women', book: 'bloodsFertility',
    groups: [['Included', ['FSH', 'LH', 'Prolactin', 'Oestradiol', 'Progesterone', 'T4', 'TSH']]],
  },
  {
    id: 'day21', name: 'Day 21 Progesterone Test', price: 90, cat: 'women', book: 'bloodsFertility',
    text: 'A blood test for progesterone in the mid-luteal stage of the menstrual cycle (7 days before your next period, i.e. day 21 of a 28-day cycle) to determine if ovulation has occurred.',
  },
  {
    id: 'amh', name: 'AMH / Ovarian Reserve Test', price: 170, cat: 'women', book: 'bloods',
    text: 'AMH levels are thought to be a direct reflection of the size of a woman’s remaining egg supply.',
  },
  { id: 'eu-viral', name: 'EU Viral Bloods', price: 90, cat: 'work', book: 'bloods' },
  {
    id: 'immunity', name: 'Pre-Employment Immunity', price: 120, cat: 'work', book: 'bloodsImmunity',
    text: 'We provide the lab reports for your employer. If you also require a Mantoux (BCG) scar report, our doctor can assess and document it at your consultation.',
    groups: [['Immunity to', ['Measles', 'Mumps', 'Rubella', 'Varicella', 'Hepatitis B', 'Core antibodies', 'Hepatitis C antibodies']]],
  },
  { id: 'blood-group', name: 'Blood Group / Blood Type Test', price: 120, cat: 'general', book: 'bloods' },
  {
    id: 'phi', name: 'Prostate Health Index (PHI)', price: 250, cat: 'men', book: 'bloods',
    text: 'PHI is a mathematical formula that combines total PSA, free PSA and a new serum marker known as [-2] proPSA into a single score that can be used to aid in clinical decision-making. It is estimated to be three times more specific in detecting prostate cancer than PSA screening alone.',
  },
  {
    id: 'quantiferon', name: 'QuantiFERON-TB Gold', price: 170, cat: 'work', book: 'bloods',
    text: 'This blood test detects Mycobacterium tuberculosis, the bacteria which causes tuberculosis (TB).',
  },
];

export const stiTests = [
  { name: 'Full STI Test', price: 120, featured: true, sample: 'Urine & blood sample', covers: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis', 'Chlamydia', 'Gonorrhoea'] },
  { name: 'Basic STI Screen', price: 80, sample: 'Urine sample', covers: ['Chlamydia', 'Gonorrhoea'] },
  { name: 'Rapid HIV Test', price: 80, sample: 'Results in 20 minutes', covers: ['HIV'], text: 'Can be booked as a standalone test or added onto a routine STI screen for instant peace of mind.' },
];

export const visaDestinations = ['Qatar', 'U.A.E.', 'Saudi Arabia', 'Bahrain', 'Kuwait', 'British Virgin Islands', 'Cayman Islands', 'China', 'Barbados', 'Bermuda', 'St Kitts'];

export const priceCategories = [
  { id: 'all', label: 'All' },
  { id: 'consult', label: 'Consultations' },
  { id: 'tests', label: 'Blood & STI tests' },
  { id: 'medicals', label: 'Medicals & forms' },
  { id: 'women', label: 'Contraception' },
  { id: 'procedures', label: 'Procedures' },
];

export const prices = [
  { cat: 'consult', name: 'General consultation', price: '€75' },
  { cat: 'consult', name: 'Telephone consultation', price: '€75' },
  { cat: 'consult', name: 'Review / follow-up consultation', note: 'Within 7 days', price: '€45' },
  { cat: 'consult', name: 'Weight-loss consultation', price: '€75' },
  { cat: 'consult', name: 'Weight-loss consultation with bloods', price: '€150' },
  { cat: 'consult', name: 'PrEP initial consultation', note: 'Includes STI screen, kidney function test and prescription fee', price: '€130' },
  { cat: 'consult', name: 'PrEP three-month review', note: 'Includes STI screen, kidney function test and prescription fee', price: '€130' },
  { cat: 'tests', name: 'Complete blood test', price: '€120' },
  { cat: 'tests', name: 'Thyroid bloods', price: '€80' },
  { cat: 'tests', name: 'Female fertility / hormone blood test', price: '€90' },
  { cat: 'tests', name: 'AMH / ovarian reserve test', price: '€170' },
  { cat: 'tests', name: 'Prostate Health Index (PHI)', price: '€250' },
  { cat: 'tests', name: 'Basic STI screening', note: 'Chlamydia and Gonorrhoea', price: '€80' },
  { cat: 'tests', name: 'Full STI screening', note: 'HIV, Hep B & C, Syphilis, Chlamydia and Gonorrhoea', price: '€120' },
  { cat: 'tests', name: 'Rapid HIV test', note: 'Results in 20 minutes', price: '€80' },
  { cat: 'medicals', name: 'Visa medicals', note: 'Standard price for most visa medicals is €420', price: 'from €320' },
  { cat: 'medicals', name: 'Pre-employment medical', price: 'from €75' },
  { cat: 'medicals', name: 'Driving licence medical', price: '€75' },
  { cat: 'medicals', name: 'Administration fee', price: 'from €25' },
  { cat: 'medicals', name: 'Social welfare / IB1 / illness benefit forms', price: 'Issued' },
  { cat: 'women', name: 'Free Contraception Scheme', note: 'Women aged 17 to 35', price: 'Free' },
  { cat: 'women', name: 'Implantable contraceptive consultation & insertion', note: 'Excludes device · Free with PPS number, aged 17–35', price: '€150' },
  { cat: 'women', name: 'Implantable contraceptive removal', note: 'Free with PPS number, aged 17–35', price: '€120' },
  { cat: 'procedures', name: '24-hour BP monitor', price: '€80' },
  { cat: 'procedures', name: 'Ear syringing', price: '€80' },
];

export const policies = [
  { title: 'Appointments', text: 'At Liffey Medical, we operate by appointment system. We do not accept walk-ins. To make an appointment please phone (01) 865 6969 or book a slot through our online booking system. If you fail to attend an appointment booked using the online system, you will need to book future appointments by phoning reception only.' },
  { title: 'Prescribing', text: 'It is our practice policy not to prescribe benzodiazepines or z-drugs.' },
  { title: 'Email', text: 'We cannot respond to medical queries/questions or book appointments via email. Email is to be used for admin queries only. Please note that emails are only read during normal working hours.' },
  { title: 'Blood tests', text: 'Requests for blood tests need to be cleared with the GP before a booking will be made. Patients cannot self-refer for blood tests.' },
  { title: 'Test results', text: 'You can request the results of any tests you may have had, such as blood tests or x-rays, by phoning the surgery. Please leave at least one week after testing to enquire to ensure all results are back.' },
  { title: 'Zero tolerance policy', text: 'Rude or abusive language or behaviour will not be tolerated. Any patient who attends the practice and is rude or abusive to the staff or other patients, be it verbally or physically, will risk being removed from the practice list.' },
  { title: 'Repeat prescriptions and letters', text: 'There is a minimum 48-hour turnaround for repeat prescriptions and letters etc. More complicated forms will take longer. An emergency five-day supply of medication can usually be obtained from the pharmacy if needed.' },
  { title: 'Fees', text: 'Your GMS card provides you with access to a wide range of medical services which are provided to you free of charge at point of delivery. These services include standard consultations for the treatment of illnesses and related services necessary for the management of a wide range of medical conditions.' },
];

export const schemeFees = [
  ['Pre-employment medical examinations', '€70'],
  ['Medical examinations or reports for legal purposes', 'from €350'],
  ['Insurance medicals or reports', 'Ask at reception'],
  ['Phlebotomy services (routine blood tests)', '€115'],
  ['Examinations relating to fitness to take part in sports or attend gyms', '€70'],
  ['Examinations relating to Fitness to Drive, including eye examinations', '€70'],
  ['School entry examinations', '€70'],
  ['Passport / Identity reports', '€20'],
  ['Creche reports / School attendance notes and certificates', '€20'],
  ['Letters in support of applications for services under the Social Welfare Acts', '€20'],
  ['Utilities reports or letters', '€20'],
  ['Preventative services such as check-ups or screening services', 'Ask at reception'],
];

export const cancellationNote = 'All cancellations incur a €15 admin fee. Late cancellations (i.e. less than 24 hours before your appointment — 5pm Friday for Monday appointments) incur a fee of 50% of the consultation fee.';

export const transport = [
  { icon: 'train', title: 'Luas', text: 'Disembark at the RED line Jervis stop. Walk down Henry Street towards Mary Street. Turn right onto Capel Street and then take the first left. Liffey Medical is number 8A on the right-hand side.' },
  { icon: 'bus', title: 'Bus', text: 'These bus lines stop near Capel Street:', chips: ['14', '145', '26', '39', '39A', '46A', '54A', '66', '7A'] },
  { icon: 'car', title: 'Parking', text: 'There is limited on-street parking on Little Britain Street. Jervis Shopping Centre Car Park has 750 spaces and is a five-minute walk from the surgery.' },
];
