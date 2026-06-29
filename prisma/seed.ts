import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Starting seed...')

  // ==================== USERS ====================
  const hashedPassword = await bcrypt.hash('password123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@celx.test' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@celx.test',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      affiliation: 'CleX Publishing',
      country: 'United States',
    },
  })

  const author = await prisma.user.upsert({
    where: { email: 'author@celx.test' },
    update: {},
    create: {
      name: 'Dr. Sarah Chen',
      email: 'author@celx.test',
      password: hashedPassword,
      role: 'AUTHOR',
      affiliation: 'University of Cambridge',
      country: 'United Kingdom',
    },
  })

  const reviewer = await prisma.user.upsert({
    where: { email: 'reviewer@celx.test' },
    update: {},
    create: {
      name: 'Prof. James Okafor',
      email: 'reviewer@celx.test',
      password: hashedPassword,
      role: 'REVIEWER',
      affiliation: 'MIT',
      country: 'United States',
    },
  })

  const editor = await prisma.user.upsert({
    where: { email: 'editor@celx.test' },
    update: {},
    create: {
      name: 'Prof. Elena Vasquez',
      email: 'editor@celx.test',
      password: hashedPassword,
      role: 'EDITOR_IN_CHIEF',
      affiliation: 'Stanford University',
      country: 'United States',
    },
  })

  const office = await prisma.user.upsert({
    where: { email: 'office@celx.test' },
    update: {},
    create: {
      name: 'Maria Santos',
      email: 'office@celx.test',
      password: hashedPassword,
      role: 'EDITORIAL_OFFICE',
      affiliation: 'CleX Publishing',
      country: 'Philippines',
    },
  })

  const production = await prisma.user.upsert({
    where: { email: 'production@celx.test' },
    update: {},
    create: {
      name: 'Thomas Mueller',
      email: 'production@celx.test',
      password: hashedPassword,
      role: 'PRODUCTION_EDITOR',
      affiliation: 'CleX Publishing',
      country: 'Germany',
    },
  })

  const finance = await prisma.user.upsert({
    where: { email: 'finance@celx.test' },
    update: {},
    create: {
      name: 'Amara Diallo',
      email: 'finance@celx.test',
      password: hashedPassword,
      role: 'FINANCE_ADMIN',
      affiliation: 'CleX Publishing',
      country: 'Senegal',
    },
  })

  const extraAuthor = await prisma.user.upsert({
    where: { email: 'author2@celx.test' },
    update: {},
    create: {
      name: 'Dr. Raj Patel',
      email: 'author2@celx.test',
      password: hashedPassword,
      role: 'AUTHOR',
      affiliation: 'IIT Bombay',
      country: 'India',
    },
  })

  const extraReviewer = await prisma.user.upsert({
    where: { email: 'reviewer2@celx.test' },
    update: {},
    create: {
      name: 'Dr. Yuki Tanaka',
      email: 'reviewer2@celx.test',
      password: hashedPassword,
      role: 'REVIEWER',
      affiliation: 'University of Tokyo',
      country: 'Japan',
    },
  })

  console.log('✅ Users seeded')

  // ==================== JOURNALS ====================
  const journal1 = await prisma.journal.upsert({
    where: { slug: 'journal-biomedical-translational-research' },
    update: {},
    create: {
      title: 'Journal of Biomedical and Translational Research',
      slug: 'journal-biomedical-translational-research',
      abbreviation: 'J Biomed Transl Res',
      issn: '2834-5610',
      eissn: '2834-5629',
      description: 'A peer-reviewed open-access journal publishing high-quality research in biomedical sciences and translational medicine.',
      aimsAndScope: 'The Journal of Biomedical and Translational Research (JBTR) publishes original research articles, review articles, and case reports in all areas of biomedical sciences including molecular biology, biochemistry, pharmacology, clinical medicine, and translational research that bridges laboratory discoveries to clinical applications.',
      subjectArea: 'Biomedical Sciences',
      editorInChiefId: editor.id,
      publicationFrequency: 'Quarterly',
      reviewTimeline: '4-8 weeks',
      apcFee: 850,
      waiverPolicy: 'Waivers are available for authors from low-income countries. Authors must apply before submission.',
      openAccessPolicy: 'All articles are published under open access and are freely available to all readers immediately upon publication.',
      indexingStatus: 'DOAJ, CrossRef, Google Scholar',
      isActive: true,
    },
  })

  const journal2 = await prisma.journal.upsert({
    where: { slug: 'journal-agricultural-veterinary-sciences' },
    update: {},
    create: {
      title: 'Journal of Agricultural and Veterinary Sciences',
      slug: 'journal-agricultural-veterinary-sciences',
      abbreviation: 'J Agric Vet Sci',
      issn: '2835-1102',
      eissn: '2835-1111',
      description: 'An international journal dedicated to agricultural innovation and veterinary medicine research.',
      aimsAndScope: 'JAVS publishes research on crop science, animal husbandry, veterinary medicine, food security, sustainable agriculture, and agri-biotechnology. The journal welcomes contributions from researchers worldwide working on solutions to global food and agricultural challenges.',
      subjectArea: 'Agriculture & Veterinary Science',
      editorInChiefId: editor.id,
      publicationFrequency: 'Biannual',
      reviewTimeline: '6-10 weeks',
      apcFee: 750,
      waiverPolicy: 'Full waivers available for authors from Sub-Saharan Africa, South Asia, and other low-income regions.',
      openAccessPolicy: 'Diamond open access — no fees charged to readers or authors from qualifying institutions.',
      indexingStatus: 'DOAJ, Google Scholar',
      isActive: true,
    },
  })

  const journal3 = await prisma.journal.upsert({
    where: { slug: 'journal-engineering-ai-applied-technologies' },
    update: {},
    create: {
      title: 'Journal of Engineering, AI and Applied Technologies',
      slug: 'journal-engineering-ai-applied-technologies',
      abbreviation: 'J Eng AI Appl Tech',
      issn: '2835-9901',
      eissn: '2835-9910',
      description: 'A multidisciplinary engineering and technology journal covering AI, robotics, smart systems, and applied innovations.',
      aimsAndScope: 'JEAAT publishes theoretical and applied research in engineering disciplines with emphasis on artificial intelligence, machine learning, robotics, IoT, smart manufacturing, and emerging technologies. Special focus is given to interdisciplinary research connecting engineering with real-world applications.',
      subjectArea: 'Engineering & Technology',
      editorInChiefId: editor.id,
      publicationFrequency: 'Quarterly',
      reviewTimeline: '4-6 weeks',
      apcFee: 950,
      waiverPolicy: 'Partial waivers available on request. Full waivers for authors from LMICs.',
      openAccessPolicy: 'Gold open access with Creative Commons licensing.',
      indexingStatus: 'CrossRef, Google Scholar, Semantic Scholar',
      isActive: true,
    },
  })

  const journal4 = await prisma.journal.upsert({
    where: { slug: 'journal-public-health-clinical-studies' },
    update: {},
    create: {
      title: 'Journal of Public Health and Clinical Studies',
      slug: 'journal-public-health-clinical-studies',
      abbreviation: 'J Public Health Clin Stud',
      issn: '2836-0044',
      eissn: '2836-0052',
      description: 'Advancing global health through rigorous clinical and epidemiological research publication.',
      aimsAndScope: 'JPHCS focuses on public health, epidemiology, clinical trials, global health policy, environmental health, health systems research, and evidence-based medicine. The journal prioritizes research with direct implications for population health outcomes and health equity.',
      subjectArea: 'Public Health & Clinical Medicine',
      editorInChiefId: editor.id,
      publicationFrequency: 'Quarterly',
      reviewTimeline: '5-9 weeks',
      apcFee: 800,
      waiverPolicy: 'Structured waiver program based on country income classification.',
      openAccessPolicy: 'All content freely accessible under CC BY 4.0.',
      indexingStatus: 'DOAJ, Google Scholar, CrossRef',
      isActive: true,
    },
  })

  const journal5 = await prisma.journal.upsert({
    where: { slug: 'student-journal-emerging-research' },
    update: {},
    create: {
      title: 'Student Journal of Emerging Research',
      slug: 'student-journal-emerging-research',
      abbreviation: 'Stud J Emerg Res',
      issn: '2837-1233',
      eissn: '2837-1241',
      description: 'A dedicated open-access journal for undergraduate and postgraduate student researchers.',
      aimsAndScope: 'SJER provides a platform for student researchers at undergraduate and postgraduate levels to publish original research, systematic reviews, and case reports. All submissions receive mentoring feedback. The journal covers all scientific disciplines.',
      subjectArea: 'Multidisciplinary',
      editorInChiefId: editor.id,
      publicationFrequency: 'Continuous',
      reviewTimeline: '3-6 weeks',
      apcFee: 200,
      waiverPolicy: 'Free to publish for all enrolled students with proof of enrollment.',
      openAccessPolicy: 'Diamond open access — completely free to publish and read.',
      indexingStatus: 'Google Scholar',
      isActive: true,
    },
  })

  console.log('✅ Journals seeded')

  // ==================== EDITORIAL BOARD ====================
  await prisma.editorialBoardMember.createMany({
    data: [
      { journalId: journal1.id, name: 'Prof. Elena Vasquez', title: 'Editor-in-Chief', affiliation: 'Stanford University', role: 'Editor-in-Chief', country: 'United States', userId: editor.id },
      { journalId: journal1.id, name: 'Dr. Michael Huang', title: 'Associate Editor', affiliation: 'Harvard Medical School', role: 'Associate Editor', country: 'United States' },
      { journalId: journal1.id, name: 'Prof. Fatima Al-Rashidi', title: 'Board Member', affiliation: 'King Saud University', role: 'Editorial Board Member', country: 'Saudi Arabia' },
      { journalId: journal1.id, name: 'Dr. Oluwaseun Adeyemi', title: 'Board Member', affiliation: 'University of Lagos', role: 'Editorial Board Member', country: 'Nigeria' },
      { journalId: journal2.id, name: 'Prof. Elena Vasquez', title: 'Editor-in-Chief', affiliation: 'Stanford University', role: 'Editor-in-Chief', country: 'United States', userId: editor.id },
      { journalId: journal2.id, name: 'Dr. Priya Krishnamurthy', title: 'Associate Editor', affiliation: 'IARI New Delhi', role: 'Associate Editor', country: 'India' },
      { journalId: journal3.id, name: 'Prof. Elena Vasquez', title: 'Editor-in-Chief', affiliation: 'Stanford University', role: 'Editor-in-Chief', country: 'United States', userId: editor.id },
      { journalId: journal3.id, name: 'Dr. Klaus Weber', title: 'Board Member', affiliation: 'TU Munich', role: 'Editorial Board Member', country: 'Germany' },
      { journalId: journal4.id, name: 'Prof. Elena Vasquez', title: 'Editor-in-Chief', affiliation: 'Stanford University', role: 'Editor-in-Chief', country: 'United States', userId: editor.id },
      { journalId: journal5.id, name: 'Prof. Elena Vasquez', title: 'Editor-in-Chief', affiliation: 'Stanford University', role: 'Editor-in-Chief', country: 'United States', userId: editor.id },
    ],
  })

  console.log('✅ Editorial board seeded')

  // ==================== VOLUMES & ISSUES ====================
  const vol1 = await prisma.volume.upsert({
    where: { journalId_number: { journalId: journal1.id, number: 1 } },
    update: {},
    create: { journalId: journal1.id, number: 1, year: 2024 },
  })
  const issue1 = await prisma.issue.upsert({
    where: { volumeId_number: { volumeId: vol1.id, number: 1 } },
    update: {},
    create: { volumeId: vol1.id, number: 1, title: 'January-March 2024', publishedAt: new Date('2024-03-31') },
  })
  const issue2 = await prisma.issue.upsert({
    where: { volumeId_number: { volumeId: vol1.id, number: 2 } },
    update: {},
    create: { volumeId: vol1.id, number: 2, title: 'April-June 2024', publishedAt: new Date('2024-06-30') },
  })

  const vol2 = await prisma.volume.upsert({
    where: { journalId_number: { journalId: journal1.id, number: 2 } },
    update: {},
    create: { journalId: journal1.id, number: 2, year: 2025 },
  })
  const issue3 = await prisma.issue.upsert({
    where: { volumeId_number: { volumeId: vol2.id, number: 1 } },
    update: {},
    create: { volumeId: vol2.id, number: 1, title: 'January-March 2025', publishedAt: new Date('2025-03-31') },
  })

  const vol3 = await prisma.volume.upsert({
    where: { journalId_number: { journalId: journal3.id, number: 1 } },
    update: {},
    create: { journalId: journal3.id, number: 1, year: 2025 },
  })
  const issue4 = await prisma.issue.upsert({
    where: { volumeId_number: { volumeId: vol3.id, number: 1 } },
    update: {},
    create: { volumeId: vol3.id, number: 1, title: 'January-June 2025', publishedAt: new Date('2025-06-30') },
  })

  console.log('✅ Volumes and issues seeded')

  // ==================== ARTICLES ====================
  const articlesData = [
    {
      title: 'CRISPR-Cas9 Mediated Gene Editing in Human Embryonic Stem Cells: A Systematic Review',
      slug: 'crispr-cas9-gene-editing-human-embryonic-stem-cells-systematic-review',
      abstract: 'This systematic review examines the current state of CRISPR-Cas9 gene editing technology applied to human embryonic stem cells (hESCs). We analyzed 87 studies published between 2013 and 2025, focusing on efficiency, off-target effects, ethical considerations, and clinical translation potential. Our findings indicate significant improvements in editing efficiency (from 15% to over 80%) over the decade, with concurrent reduction in off-target events through advances in guide RNA design and Cas9 variants.',
      keywords: 'CRISPR-Cas9, gene editing, embryonic stem cells, systematic review, off-target effects',
      articleType: 'REVIEW_ARTICLE' as const,
      journalId: journal1.id,
      volumeId: vol1.id,
      issueId: issue1.id,
      doi: '10.12345/jbtr.2024.001',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-01-15'),
      acceptedDate: new Date('2024-02-28'),
      publishedDate: new Date('2024-03-10'),
      isPublished: true,
      viewCount: 1254,
      downloadCount: 389,
      fullTextHtml: '<h2>Introduction</h2><p>The discovery of the CRISPR-Cas9 system has revolutionized our ability to edit the human genome with unprecedented precision. Since its first application in human cells, this technology has shown tremendous promise for treating genetic diseases.</p><h2>Methods</h2><p>We conducted a systematic search of PubMed, Scopus, and Web of Science databases using terms including "CRISPR-Cas9", "human embryonic stem cells", "gene editing", and related terms. Studies were included if they reported original research on CRISPR editing in hESCs published between January 2013 and December 2025.</p><h2>Results</h2><p>A total of 87 studies met inclusion criteria. Editing efficiency improved from 15.3% ± 4.2% in early studies (2013-2016) to 81.7% ± 6.8% in recent studies (2022-2025). Off-target rates decreased proportionally with guide RNA improvements.</p><h2>Discussion</h2><p>Our findings demonstrate that CRISPR technology has matured significantly for use in hESCs. The remaining challenges include delivery mechanisms and long-term genomic stability post-editing.</p><h2>Conclusion</h2><p>CRISPR-Cas9 gene editing in hESCs has reached a level of technical maturity that supports cautious clinical translation for specific monogenic disorders.</p>',
      fundingStatement: 'This research was supported by NIH Grant R01GM123456.',
      conflictOfInterest: 'The authors declare no conflicts of interest.',
      ethicsStatement: 'This systematic review did not require ethical approval as it analyzed previously published data.',
      dataAvailability: 'All data analyzed are available in the cited publications.',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
    {
      title: 'Machine Learning-Based Prediction of Antibiotic Resistance Patterns in Gram-Negative Bacteria',
      slug: 'ml-prediction-antibiotic-resistance-gram-negative-bacteria',
      abstract: 'We developed a machine learning framework to predict antibiotic resistance patterns in clinical gram-negative bacterial isolates using whole-genome sequencing data. Using a dataset of 12,847 isolates from 23 hospitals across 6 countries, our XGBoost model achieved 94.2% accuracy in predicting resistance phenotypes. The model identified 127 novel genetic markers associated with resistance, expanding our understanding of resistance mechanisms.',
      keywords: 'machine learning, antibiotic resistance, gram-negative bacteria, whole-genome sequencing, XGBoost',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal1.id,
      volumeId: vol1.id,
      issueId: issue2.id,
      doi: '10.12345/jbtr.2024.018',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-02-20'),
      acceptedDate: new Date('2024-05-10'),
      publishedDate: new Date('2024-05-22'),
      isPublished: true,
      viewCount: 876,
      downloadCount: 234,
      fullTextHtml: '<h2>Introduction</h2><p>Antibiotic resistance represents one of the greatest threats to modern medicine. The emergence of multidrug-resistant gram-negative organisms has severely limited therapeutic options globally.</p><h2>Methods</h2><p>We collected whole-genome sequences and paired phenotypic susceptibility data from 12,847 gram-negative isolates. Genomic features including SNPs, INDELs, and presence/absence of resistance genes were extracted and used to train machine learning models.</p><h2>Results</h2><p>Our XGBoost classifier achieved AUROC of 0.97 and accuracy of 94.2% on held-out test data. Performance exceeded traditional molecular methods by 12-18 percentage points across antibiotic classes.</p><h2>Discussion</h2><p>The high predictive performance of our model suggests that WGS-based ML approaches can supplement and eventually replace traditional susceptibility testing in clinical microbiology laboratories.</p>',
      fundingStatement: 'Funded by Wellcome Trust Grant 219488/Z/19/Z.',
      conflictOfInterest: 'None declared.',
      ethicsStatement: 'Approved by the Multi-Site Ethics Committee (Ref: MSEC-2023-0047).',
      dataAvailability: 'Genome sequences deposited at NCBI SRA under BioProject PRJNA987654.',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
    {
      title: 'Effectiveness of Precision Agriculture Technologies in Sub-Saharan Smallholder Farming Systems',
      slug: 'precision-agriculture-technologies-sub-saharan-smallholder-farming',
      abstract: 'This study evaluated the adoption and effectiveness of precision agriculture technologies among smallholder farmers in four Sub-Saharan African countries. A mixed-methods approach combining household surveys (n=2,340), agronomic field trials, and remote sensing data revealed that mobile-based soil monitoring increased crop yields by 23.4% and reduced fertilizer input costs by 31.2% over three growing seasons.',
      keywords: 'precision agriculture, smallholder farming, Sub-Saharan Africa, food security, mobile technology',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal2.id,
      volumeId: vol1.id,
      issueId: issue1.id,
      doi: '10.12345/javs.2024.003',
      license: 'CC_BY' as const,
      receivedDate: new Date('2023-11-05'),
      acceptedDate: new Date('2024-01-18'),
      publishedDate: new Date('2024-02-01'),
      isPublished: true,
      viewCount: 1089,
      downloadCount: 312,
      fullTextHtml: '<h2>Introduction</h2><p>Smallholder farmers produce approximately 70% of food consumed in Sub-Saharan Africa, yet they face significant productivity challenges including soil degradation, climate variability, and limited access to inputs and technology.</p><h2>Methods</h2><p>We conducted household surveys in Ethiopia, Ghana, Kenya, and Tanzania between 2021 and 2023. Field trials using randomized complete block designs tested mobile soil monitoring against control plots. Remote sensing using Sentinel-2 imagery assessed crop health.</p><h2>Results</h2><p>Mobile soil monitoring adoption reached 67.3% among participating farmers by Year 3. Yield increases of 23.4% (SE ±2.1%) were observed. Fertilizer cost savings averaged USD 127 per hectare per season.</p>',
      fundingStatement: 'Funded by the Gates Foundation Agricultural Development grant.',
      conflictOfInterest: 'Authors declare no conflicts of interest.',
      ethicsStatement: 'Approved by national ethics committees in all four countries.',
      dataAvailability: 'Dataset available upon reasonable request to the corresponding author.',
      authorName: 'Dr. Raj Patel',
      authorAffiliation: 'IIT Bombay',
    },
    {
      title: 'Transformer-Based Architecture for Real-Time Sign Language Recognition',
      slug: 'transformer-architecture-real-time-sign-language-recognition',
      abstract: 'We present SignFormer, a novel transformer-based architecture for real-time sign language recognition from video input. Our model processes skeletal keypoints extracted from RGB video using a modified Vision Transformer with temporal attention mechanisms, achieving 96.8% accuracy on the ASLVD benchmark and 94.1% on Phoenix-2014T. The model runs at 47 FPS on standard consumer hardware, enabling practical real-time applications.',
      keywords: 'sign language recognition, transformer, computer vision, accessibility, real-time processing',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal3.id,
      volumeId: vol3.id,
      issueId: issue4.id,
      doi: '10.12345/jeaat.2025.011',
      license: 'CC_BY' as const,
      receivedDate: new Date('2025-01-08'),
      acceptedDate: new Date('2025-03-15'),
      publishedDate: new Date('2025-03-28'),
      isPublished: true,
      viewCount: 2341,
      downloadCount: 891,
      fullTextHtml: '<h2>Introduction</h2><p>Sign language recognition systems have the potential to dramatically improve communication accessibility for deaf and hard-of-hearing individuals. Despite decades of research, real-time accurate recognition remains challenging.</p><h2>Methods</h2><p>SignFormer uses MediaPipe for skeletal keypoint extraction at 30 FPS, followed by a custom temporal transformer with 12 attention heads and 6 layers. Training used a combined dataset of 150,000 signed sequences.</p><h2>Results</h2><p>On ASLVD benchmark: 96.8% accuracy (previous SOTA: 93.2%). On Phoenix-2014T: 94.1% WER improvement over baseline. Inference speed: 47 FPS on RTX 3060.</p>',
      fundingStatement: 'This work received no external funding.',
      conflictOfInterest: 'None declared.',
      ethicsStatement: 'No human subjects were involved beyond publicly available datasets.',
      dataAvailability: 'Code and model weights available at github.com/signformer (placeholder).',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
    {
      title: 'Long-COVID Neurological Manifestations: A Prospective Cohort Study of 3,891 Patients',
      slug: 'long-covid-neurological-manifestations-prospective-cohort-study',
      abstract: 'This prospective cohort study followed 3,891 patients with confirmed SARS-CoV-2 infection for 18 months to characterize neurological manifestations of Long-COVID. We found that 38.7% of participants experienced persistent neurological symptoms beyond 12 weeks post-infection. Cognitive impairment (23.1%), headache (21.4%), and peripheral neuropathy (14.8%) were the most prevalent symptoms. Severity of acute illness was not a reliable predictor of Long-COVID neurological burden.',
      keywords: 'Long-COVID, neurological manifestations, SARS-CoV-2, cognitive impairment, prospective cohort',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal4.id,
      volumeId: vol2.id,
      issueId: issue3.id,
      doi: '10.12345/jphcs.2025.007',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-09-14'),
      acceptedDate: new Date('2024-12-20'),
      publishedDate: new Date('2025-01-15'),
      isPublished: true,
      viewCount: 3201,
      downloadCount: 1102,
      fullTextHtml: '<h2>Introduction</h2><p>Long-COVID, characterized by persistent symptoms beyond 4 weeks of initial infection, affects an estimated 10-35% of SARS-CoV-2 infected individuals worldwide. Neurological manifestations are among the most debilitating and poorly understood aspects of this condition.</p><h2>Methods</h2><p>Consecutive adults with RT-PCR confirmed COVID-19 were enrolled from 12 hospitals across 5 countries between October 2022 and March 2023. Follow-up occurred at 1, 3, 6, 12, and 18 months using standardized neurological assessments.</p><h2>Results</h2><p>At 12-week assessment, 38.7% (n=1,506) reported at least one persistent neurological symptom. Cognitive impairment was documented in 23.1%, headache in 21.4%, and peripheral neuropathy in 14.8% of the total cohort.</p>',
      fundingStatement: 'EU Horizon 2020 grant agreement No. 101003589.',
      conflictOfInterest: 'All authors declare no conflicts of interest.',
      ethicsStatement: 'Approved by multi-national ethics consortium (MNEC-COV-2022-117).',
      dataAvailability: 'Anonymized data available through EU Open Data Portal.',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
    {
      title: 'Quantum Computing Applications in Drug Discovery: Current Status and Future Prospects',
      slug: 'quantum-computing-drug-discovery-current-status-future-prospects',
      abstract: 'This review examines the intersection of quantum computing and pharmaceutical drug discovery, with particular focus on molecular simulation, protein folding prediction, and optimization of drug-target interactions. We analyze 156 studies from 2018-2025 and identify key milestones, current limitations primarily related to qubit coherence times, and projected timelines for practical quantum advantage in drug discovery applications.',
      keywords: 'quantum computing, drug discovery, molecular simulation, protein folding, quantum advantage',
      articleType: 'REVIEW_ARTICLE' as const,
      journalId: journal1.id,
      volumeId: vol2.id,
      issueId: issue3.id,
      doi: '10.12345/jbtr.2025.003',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-10-20'),
      acceptedDate: new Date('2025-01-08'),
      publishedDate: new Date('2025-01-20'),
      isPublished: true,
      viewCount: 1567,
      downloadCount: 445,
      fullTextHtml: '<h2>Introduction</h2><p>Drug discovery is an inherently computational challenge, requiring simulation of molecular interactions at quantum mechanical precision. Classical computers struggle with the exponential scaling of quantum systems, making quantum computing a natural candidate for transforming pharmaceutical research.</p><h2>Current State</h2><p>Current NISQ-era quantum computers offer 50-1000 qubits with coherence times of microseconds to milliseconds. Variational quantum eigensolvers (VQE) and quantum approximate optimization algorithms (QAOA) show promise for near-term applications.</p>',
      fundingStatement: 'No external funding.',
      conflictOfInterest: 'Author A.B. is a paid consultant for QuantumPharma Inc.',
      ethicsStatement: 'Not applicable.',
      dataAvailability: 'Not applicable — review article.',
      authorName: 'Prof. James Okafor',
      authorAffiliation: 'MIT',
    },
    {
      title: 'Gut Microbiome Dysbiosis in Type 2 Diabetes: A Meta-Analysis',
      slug: 'gut-microbiome-dysbiosis-type-2-diabetes-meta-analysis',
      abstract: 'A comprehensive meta-analysis of 64 studies (n=28,341 participants) examining gut microbiome alterations in Type 2 Diabetes Mellitus. We identified consistent depletion of Akkermansia muciniphila, Faecalibacterium prausnitzii, and Bifidobacterium species alongside enrichment of Ruminococcus gnavus and Clostridium species in T2DM patients. Effect sizes correlated with HbA1c levels (r=0.67, p<0.001), suggesting the microbiome as a potential therapeutic target.',
      keywords: 'gut microbiome, type 2 diabetes, dysbiosis, meta-analysis, Akkermansia muciniphila',
      articleType: 'REVIEW_ARTICLE' as const,
      journalId: journal1.id,
      volumeId: vol1.id,
      issueId: issue2.id,
      doi: '10.12345/jbtr.2024.025',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-03-10'),
      acceptedDate: new Date('2024-05-28'),
      publishedDate: new Date('2024-06-10'),
      isPublished: true,
      viewCount: 2087,
      downloadCount: 723,
      fullTextHtml: '<h2>Background</h2><p>Type 2 Diabetes Mellitus affects over 537 million adults globally. Growing evidence implicates gut microbiome dysbiosis in T2DM pathogenesis, but individual studies have been limited by sample sizes and heterogeneity.</p><h2>Methods</h2><p>We searched MEDLINE, Embase, and Cochrane Library for studies reporting 16S rRNA or shotgun metagenomic sequencing in T2DM cases vs. controls. Quality assessment used the Newcastle-Ottawa Scale.</p>',
      fundingStatement: 'Chinese National Natural Science Foundation Grant 82170812.',
      conflictOfInterest: 'None declared.',
      ethicsStatement: 'Meta-analysis; no primary ethical approval required.',
      dataAvailability: 'Data extraction tables available as supplementary materials.',
      authorName: 'Dr. Raj Patel',
      authorAffiliation: 'IIT Bombay',
    },
    {
      title: 'Smart Grid Energy Management Using Deep Reinforcement Learning',
      slug: 'smart-grid-energy-management-deep-reinforcement-learning',
      abstract: 'We present a deep reinforcement learning framework for optimal energy management in smart grids with high penetration of renewable energy sources. Our proximal policy optimization (PPO) agent learns to balance energy supply and demand across a simulated grid with 500 nodes, achieving 18.3% reduction in curtailment of renewable energy and 22.7% decrease in peak load compared to rule-based baselines.',
      keywords: 'smart grid, deep reinforcement learning, energy management, renewable energy, PPO',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal3.id,
      volumeId: vol3.id,
      issueId: issue4.id,
      doi: '10.12345/jeaat.2025.019',
      license: 'CC_BY' as const,
      receivedDate: new Date('2025-02-01'),
      acceptedDate: new Date('2025-04-10'),
      publishedDate: new Date('2025-04-25'),
      isPublished: true,
      viewCount: 934,
      downloadCount: 287,
      fullTextHtml: '<h2>Introduction</h2><p>The transition to renewable energy sources introduces significant challenges for grid stability due to the intermittent nature of solar and wind generation. Traditional rule-based energy management systems struggle to adapt to the complex, dynamic environments created by high renewable penetration.</p><h2>Methods</h2><p>We modeled a distribution network with 500 nodes including photovoltaic installations, wind turbines, battery storage systems, and conventional generators. Our PPO agent interacts with this environment through an OpenAI Gym-compatible interface.</p>',
      fundingStatement: 'EU Clean Energy Transition fund, grant ECT-2024-1122.',
      conflictOfInterest: 'None declared.',
      ethicsStatement: 'Not applicable — computational study.',
      dataAvailability: 'Simulation code available at github.com/smartgrid-drl (placeholder).',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
    {
      title: 'Maternal Mental Health During Pregnancy: Prevalence and Risk Factors in Low-Middle Income Countries',
      slug: 'maternal-mental-health-pregnancy-prevalence-risk-factors-lmic',
      abstract: 'This multi-country study examined the prevalence of depression and anxiety during pregnancy across 8 low- and middle-income countries, involving 15,632 pregnant women at gestational weeks 16-20. Overall prevalence of depressive symptoms was 31.4% (95% CI: 29.8-33.1%), with significant variation across countries (range: 18.9%-47.3%). Key risk factors included intimate partner violence (OR=3.21), food insecurity (OR=2.87), and lack of social support (OR=2.44).',
      keywords: 'maternal mental health, perinatal depression, LMIC, prevalence, risk factors',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal4.id,
      volumeId: vol2.id,
      issueId: issue3.id,
      doi: '10.12345/jphcs.2025.014',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-08-22'),
      acceptedDate: new Date('2024-11-30'),
      publishedDate: new Date('2025-01-08'),
      isPublished: true,
      viewCount: 1432,
      downloadCount: 489,
      fullTextHtml: '<h2>Introduction</h2><p>Perinatal mental health disorders represent a significant yet under-recognized public health burden, particularly in LMICs where mental health resources are limited and stigma remains high.</p><h2>Methods</h2><p>Cross-sectional survey conducted in Bangladesh, Ethiopia, India, Kenya, Nigeria, Pakistan, Peru, and Uganda. The Edinburgh Postnatal Depression Scale (EPDS) and Generalized Anxiety Disorder-7 scale were administered by trained community health workers.</p>',
      fundingStatement: 'WHO Special Programme of Research, Development and Research Training in Human Reproduction (HRP).',
      conflictOfInterest: 'No conflicts declared.',
      ethicsStatement: 'Approved by WHO Ethics Review Committee and all national ethics boards.',
      dataAvailability: 'De-identified data available from WHO data repository.',
      authorName: 'Prof. James Okafor',
      authorAffiliation: 'MIT',
    },
    {
      title: 'Effectiveness of School-Based Nutrition Interventions on Childhood Obesity in Urban Settings',
      slug: 'school-based-nutrition-interventions-childhood-obesity-urban',
      abstract: 'A cluster-randomized controlled trial evaluated a comprehensive school-based nutrition program across 48 urban schools (n=6,240 students aged 8-12) over 24 months. The intervention combined dietary education, physical activity integration, and cafeteria menu modification. BMI z-score reduction of 0.31 SD was achieved in intervention schools versus 0.08 SD increase in controls (p<0.001), with greatest effects in students with baseline obesity.',
      keywords: 'childhood obesity, school nutrition, cluster RCT, urban health, dietary intervention',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal4.id,
      volumeId: vol1.id,
      issueId: issue1.id,
      doi: '10.12345/jphcs.2024.005',
      license: 'CC_BY' as const,
      receivedDate: new Date('2023-12-15'),
      acceptedDate: new Date('2024-02-20'),
      publishedDate: new Date('2024-03-05'),
      isPublished: true,
      viewCount: 1798,
      downloadCount: 612,
      fullTextHtml: '<h2>Background</h2><p>Childhood obesity rates have tripled globally since 1975, with urban environments contributing disproportionately through obesogenic built environments, food advertising, and sedentary lifestyles.</p><h2>Methods</h2><p>48 urban primary schools were randomized 1:1 to intervention or control. The intervention comprised 6 components: dietary literacy curriculum, physical education enhancement, cafeteria overhaul, parent engagement, teacher training, and environmental assessment.</p>',
      fundingStatement: 'CDC Community Preventive Services Task Force funding.',
      conflictOfInterest: 'None declared.',
      ethicsStatement: 'IRB approved; parental consent obtained for all participants.',
      dataAvailability: 'Individual-level data available upon FOIA request.',
      authorName: 'Dr. Raj Patel',
      authorAffiliation: 'IIT Bombay',
    },
    // 10 more articles
    {
      title: 'Artificial Pancreas Systems in Type 1 Diabetes: 5-Year Real-World Outcomes',
      slug: 'artificial-pancreas-type-1-diabetes-5-year-outcomes',
      abstract: 'A five-year observational study of 892 individuals using commercial artificial pancreas systems for Type 1 Diabetes management. Time-in-range (TIR, 70-180 mg/dL) improved from 48.2% at baseline to 73.8% at 5-year follow-up. Severe hypoglycemia events decreased by 87.3%. HbA1c reduction averaged 1.4 percentage points, with significant quality-of-life improvements reported across all validated instruments.',
      keywords: 'artificial pancreas, Type 1 Diabetes, closed-loop insulin delivery, time-in-range, real-world evidence',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal1.id,
      volumeId: vol2.id,
      issueId: issue3.id,
      doi: '10.12345/jbtr.2025.009',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-11-10'),
      acceptedDate: new Date('2025-01-25'),
      publishedDate: new Date('2025-02-10'),
      isPublished: true,
      viewCount: 2108,
      downloadCount: 784,
      fullTextHtml: '<h2>Introduction</h2><p>Artificial pancreas (AP) systems represent the culmination of decades of engineering and clinical research to automate insulin delivery. Commercial systems have now been available for several years, enabling real-world efficacy assessment.</p>',
      fundingStatement: 'Juvenile Diabetes Research Foundation (JDRF) grant 2-SRA-2020-1105.',
      conflictOfInterest: 'Dr. A.B. received speaker fees from MedTech Corp (unrelated to this study).',
      ethicsStatement: 'Approved by National Health Authority Ethics Committee (NHAEC-2018-0892).',
      dataAvailability: 'Aggregated data available in supplementary tables. Individual data under privacy restrictions.',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
    {
      title: 'Blockchain Technology for Agricultural Supply Chain Transparency in Developing Economies',
      slug: 'blockchain-agricultural-supply-chain-transparency-developing-economies',
      abstract: 'This study investigates the implementation and impact of blockchain-based supply chain tracking systems across cocoa and coffee supply chains in Ghana and Ethiopia, respectively. A quasi-experimental design with 234 farming cooperatives revealed that blockchain adoption increased farmgate prices received by smallholders by 15.7% and reduced post-harvest losses by 28.4% through improved coordination and trust mechanisms.',
      keywords: 'blockchain, supply chain, agriculture, Ghana, Ethiopia, smallholder',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal2.id,
      volumeId: vol1.id,
      issueId: issue1.id,
      doi: '10.12345/javs.2024.012',
      license: 'CC_BY' as const,
      receivedDate: new Date('2023-10-12'),
      acceptedDate: new Date('2024-01-05'),
      publishedDate: new Date('2024-01-20'),
      isPublished: true,
      viewCount: 743,
      downloadCount: 198,
      fullTextHtml: '<h2>Introduction</h2><p>Agricultural supply chains in developing economies are characterized by opacity, information asymmetry, and high transaction costs that systematically disadvantage smallholder farmers.</p>',
      fundingStatement: 'USAID Agrilinks program grant.',
      conflictOfInterest: 'None.',
      ethicsStatement: 'Ethics approval received from University of Ghana Research Ethics Board and AAU IRB.',
      dataAvailability: 'Data available upon written request.',
      authorName: 'Dr. Raj Patel',
      authorAffiliation: 'IIT Bombay',
    },
    {
      title: 'Large Language Models in Medical Diagnosis: A Systematic Evaluation',
      slug: 'large-language-models-medical-diagnosis-systematic-evaluation',
      abstract: 'We conducted the largest systematic evaluation of large language models (LLMs) in medical diagnostic tasks to date, assessing 12 models across 47 clinical specialties using 18,400 standardized clinical cases. GPT-4 and Claude-3 Opus achieved diagnostic accuracy comparable to junior physicians in 31 of 47 specialties. Critical failures occurred most frequently in rare disease diagnosis and cases requiring integration of imaging findings.',
      keywords: 'large language models, medical diagnosis, GPT-4, clinical AI, systematic evaluation',
      articleType: 'REVIEW_ARTICLE' as const,
      journalId: journal1.id,
      volumeId: vol2.id,
      issueId: issue3.id,
      doi: '10.12345/jbtr.2025.021',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-12-01'),
      acceptedDate: new Date('2025-02-15'),
      publishedDate: new Date('2025-03-01'),
      isPublished: true,
      viewCount: 4521,
      downloadCount: 1873,
      fullTextHtml: '<h2>Introduction</h2><p>The rapid advancement of large language models has generated substantial interest in their potential applications in healthcare, particularly in diagnostic reasoning and clinical decision support.</p>',
      fundingStatement: 'Google Health AI Research Award.',
      conflictOfInterest: 'Author C.D. is employed by Google Health (no influence on research design or findings).',
      ethicsStatement: 'Utilized only publicly available or licensed case databases; no patient data collected.',
      dataAvailability: 'Evaluation framework code available at github.com/medllm-eval (placeholder).',
      authorName: 'Prof. James Okafor',
      authorAffiliation: 'MIT',
    },
    {
      title: 'IoT-Enabled Precision Livestock Monitoring: Health and Productivity Outcomes',
      slug: 'iot-precision-livestock-monitoring-health-productivity',
      abstract: 'This study deployed a comprehensive IoT sensor network across 12 commercial cattle farms to monitor health indicators, activity patterns, and feeding behaviors in real-time. The system, comprising 3,840 sensor nodes monitoring 6,200 animals over 18 months, achieved 91.3% sensitivity in early disease detection, reducing veterinary intervention costs by 34.8% and overall farm productivity increased by 19.2% through optimized management decisions.',
      keywords: 'IoT, precision livestock, health monitoring, cattle, sensor networks',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal2.id,
      volumeId: vol1.id,
      issueId: issue2.id,
      doi: '10.12345/javs.2024.028',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-01-25'),
      acceptedDate: new Date('2024-04-12'),
      publishedDate: new Date('2024-04-30'),
      isPublished: true,
      viewCount: 621,
      downloadCount: 167,
      fullTextHtml: '<h2>Introduction</h2><p>Livestock production faces dual pressures of increasing global demand and intensifying scrutiny over animal welfare and environmental impact. Precision livestock farming (PLF) offers data-driven approaches to address these challenges simultaneously.</p>',
      fundingStatement: 'European Agricultural Fund for Rural Development (EAFRD) grant.',
      conflictOfInterest: 'None declared.',
      ethicsStatement: 'All procedures approved by the National Animal Experiment Committee.',
      dataAvailability: 'Aggregated farm-level data available upon request.',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
    {
      title: 'Edge Computing Architectures for Autonomous Vehicle Decision Systems',
      slug: 'edge-computing-autonomous-vehicle-decision-systems',
      abstract: 'We present EdgeNav, a hierarchical edge computing architecture designed specifically for real-time decision making in autonomous vehicles. The system distributes computational tasks across onboard edge units, roadside infrastructure, and cloud resources based on latency requirements and safety criticality. Tested in 45,000 km of mixed urban and highway driving, EdgeNav achieved 99.97% uptime with average decision latency of 8.3ms.',
      keywords: 'edge computing, autonomous vehicles, real-time systems, latency, safety-critical computing',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal3.id,
      volumeId: vol3.id,
      issueId: issue4.id,
      doi: '10.12345/jeaat.2025.027',
      license: 'CC_BY' as const,
      receivedDate: new Date('2025-01-20'),
      acceptedDate: new Date('2025-03-28'),
      publishedDate: new Date('2025-04-10'),
      isPublished: true,
      viewCount: 1123,
      downloadCount: 398,
      fullTextHtml: '<h2>Introduction</h2><p>Autonomous vehicles require processing of terabytes of sensor data per hour while maintaining decision latencies below 100ms for safety-critical maneuvers. Traditional centralized cloud computing cannot meet these requirements.</p>',
      fundingStatement: 'Toyota Research Institute collaborative grant TRI-2024-AV-07.',
      conflictOfInterest: 'Author E.F. is a paid technical advisor to AutoDrive Inc. (unrelated technology sector).',
      ethicsStatement: 'Testing conducted on closed tracks and public roads with appropriate regulatory permits.',
      dataAvailability: 'EdgeNav codebase available under MIT license at github.com/edgenav (placeholder).',
      authorName: 'Prof. James Okafor',
      authorAffiliation: 'MIT',
    },
    {
      title: 'One Health Approach to Zoonotic Disease Surveillance at the Human-Animal Interface',
      slug: 'one-health-zoonotic-disease-surveillance-human-animal-interface',
      abstract: 'This implementation study evaluated a One Health surveillance platform integrating human, animal, and environmental disease data across 6 countries in Southeast Asia over 36 months. The integrated system identified 23 emerging zoonotic clusters an average of 47 days earlier than conventional siloed surveillance, and facilitated coordinated containment responses that limited outbreak spread in 19 of 23 events.',
      keywords: 'One Health, zoonotic diseases, surveillance, Southeast Asia, emerging infections',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal4.id,
      volumeId: vol1.id,
      issueId: issue2.id,
      doi: '10.12345/jphcs.2024.021',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-01-30'),
      acceptedDate: new Date('2024-04-18'),
      publishedDate: new Date('2024-05-05'),
      isPublished: true,
      viewCount: 1876,
      downloadCount: 634,
      fullTextHtml: '<h2>Introduction</h2><p>Approximately 75% of emerging infectious diseases in humans originate from animals. The One Health framework recognizes that human health is inextricably linked to animal and environmental health, necessitating integrated surveillance approaches.</p>',
      fundingStatement: 'USAID Emerging Pandemic Threats 2 program.',
      conflictOfInterest: 'None declared.',
      ethicsStatement: 'Approved by all participating countries national ethics committees and WHO.',
      dataAvailability: 'Surveillance platform technical documentation publicly available. Raw data held by respective governments.',
      authorName: 'Dr. Raj Patel',
      authorAffiliation: 'IIT Bombay',
    },
    {
      title: 'Solar-Powered Desalination for Rural Water Security: A Techno-Economic Analysis',
      slug: 'solar-desalination-rural-water-security-techno-economic',
      abstract: 'This study presents a techno-economic analysis of small-scale solar-powered reverse osmosis desalination systems for rural communities in coastal arid regions. Modeling 127 deployment scenarios across 8 countries with varying solar irradiance, salinity, and community size parameters, we identified optimal system configurations delivering potable water at USD 0.38-0.67 per cubic meter—competitive with bottled water alternatives prevalent in these regions.',
      keywords: 'solar desalination, reverse osmosis, water security, techno-economic analysis, rural communities',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal3.id,
      volumeId: vol3.id,
      issueId: issue4.id,
      doi: '10.12345/jeaat.2025.033',
      license: 'CC_BY' as const,
      receivedDate: new Date('2025-02-15'),
      acceptedDate: new Date('2025-04-22'),
      publishedDate: new Date('2025-05-05'),
      isPublished: true,
      viewCount: 892,
      downloadCount: 267,
      fullTextHtml: '<h2>Introduction</h2><p>Water scarcity affects over 2 billion people globally, with rural coastal communities facing the paradox of proximity to vast water resources—the ocean—yet lacking access to affordable fresh water. Solar-powered desalination presents a potentially transformative solution.</p>',
      fundingStatement: 'World Bank Water and Sanitation Program.',
      conflictOfInterest: 'None.',
      ethicsStatement: 'Techno-economic modeling study; no human subjects involved.',
      dataAvailability: 'Full model parameters and code in supplementary materials.',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
    {
      title: 'mRNA Vaccine Platform Adaptability: Lessons from COVID-19 for Future Pandemic Preparedness',
      slug: 'mrna-vaccine-adaptability-covid19-pandemic-preparedness',
      abstract: 'We analyze the deployment and adaptation of mRNA vaccine platforms during the COVID-19 pandemic to extract lessons for future pandemic preparedness. Through review of regulatory filings, clinical trial data, and manufacturing scale-up records, we identify seven key adaptability factors that determined vaccine development speed. Our framework proposes a Pandemic Vaccine Readiness Index (PVRI) for prospective evaluation of platform technologies.',
      keywords: 'mRNA vaccines, pandemic preparedness, COVID-19, vaccine platform, regulatory science',
      articleType: 'REVIEW_ARTICLE' as const,
      journalId: journal4.id,
      volumeId: vol2.id,
      issueId: issue3.id,
      doi: '10.12345/jphcs.2025.029',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-11-05'),
      acceptedDate: new Date('2025-01-18'),
      publishedDate: new Date('2025-02-01'),
      isPublished: true,
      viewCount: 2934,
      downloadCount: 1089,
      fullTextHtml: '<h2>Introduction</h2><p>The COVID-19 pandemic provided an unprecedented real-world test of vaccine platform adaptability. The mRNA platform, previously theoretical in large-scale deployment, demonstrated remarkable speed from sequence to authorized vaccine in under 12 months.</p>',
      fundingStatement: 'CEPI (Coalition for Epidemic Preparedness Innovations) grant.',
      conflictOfInterest: 'Authors G.H. and I.J. have received research support from Moderna and BioNTech respectively (no influence on review findings).',
      ethicsStatement: 'Review of publicly available data; no ethical approval required.',
      dataAvailability: 'All data sources cited and publicly available.',
      authorName: 'Prof. James Okafor',
      authorAffiliation: 'MIT',
    },
    {
      title: 'Climate-Resilient Crop Varieties and Food Systems Transformation in the Sahel Region',
      slug: 'climate-resilient-crops-food-systems-sahel',
      abstract: 'Multi-season field trials of 34 climate-resilient crop varieties across 6 Sahel countries evaluated yield performance, drought tolerance, nutritional quality, and farmer adoption potential. Four sorghum and pearl millet varieties showed superior performance across all parameters, with 31-47% yield advantage over local landraces under drought stress conditions. Participatory varietal selection increased adoption intent by 2.4x compared to top-down recommendation approaches.',
      keywords: 'climate-resilient crops, Sahel, drought tolerance, sorghum, pearl millet, food security',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal2.id,
      volumeId: vol1.id,
      issueId: issue2.id,
      doi: '10.12345/javs.2024.041',
      license: 'CC_BY' as const,
      receivedDate: new Date('2024-02-28'),
      acceptedDate: new Date('2024-05-15'),
      publishedDate: new Date('2024-06-01'),
      isPublished: true,
      viewCount: 1234,
      downloadCount: 412,
      fullTextHtml: '<h2>Introduction</h2><p>The Sahel region faces an acute food security crisis exacerbated by climate change. Average rainfall has declined 10-20% over the past 50 years, while extreme weather events have become more frequent and severe, threatening crop production systems.</p>',
      fundingStatement: 'CGIAR Research Program on Dryland Systems.',
      conflictOfInterest: 'None declared.',
      ethicsStatement: 'Field trials conducted with farmer consent; approved by all national agricultural research institutions.',
      dataAvailability: 'Trial data deposited in CGIAR DataVerse.',
      authorName: 'Dr. Raj Patel',
      authorAffiliation: 'IIT Bombay',
    },
    {
      title: 'Neural Architecture Search for Resource-Constrained Medical Imaging Devices',
      slug: 'neural-architecture-search-medical-imaging-resource-constrained',
      abstract: 'We present MedNAS, a specialized neural architecture search framework optimized for deployment of medical imaging AI on resource-constrained devices including point-of-care ultrasound machines and portable retinal cameras. Our evolutionary search algorithm with hardware-aware cost modeling discovered architectures achieving >90% accuracy on 5 benchmark imaging tasks while meeting strict memory (<100MB) and inference speed (<50ms) constraints for edge deployment.',
      keywords: 'neural architecture search, medical imaging, edge AI, point-of-care diagnostics, model compression',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal3.id,
      volumeId: vol3.id,
      issueId: issue4.id,
      doi: '10.12345/jeaat.2025.044',
      license: 'CC_BY' as const,
      receivedDate: new Date('2025-03-01'),
      acceptedDate: new Date('2025-05-10'),
      publishedDate: new Date('2025-05-25'),
      isPublished: true,
      viewCount: 789,
      downloadCount: 213,
      fullTextHtml: '<h2>Introduction</h2><p>Medical AI models have demonstrated remarkable diagnostic performance but their deployment in resource-limited settings is hampered by high computational requirements. Neural architecture search offers a systematic approach to discover efficient model architectures.</p>',
      fundingStatement: 'Microsoft Research AI for Health grant.',
      conflictOfInterest: 'Co-author K.L. is a Microsoft Research employee; had no role in experimental design or analysis.',
      ethicsStatement: 'Benchmark datasets used under approved data license agreements. No new patient data collected.',
      dataAvailability: 'MedNAS framework released at github.com/mednas (placeholder).',
      authorName: 'Dr. Sarah Chen',
      authorAffiliation: 'University of Cambridge',
    },
  ]

  for (const articleData of articlesData) {
    const { authorName, authorAffiliation, ...data } = articleData
    const existing = await prisma.article.findUnique({ where: { slug: data.slug } })
    if (!existing) {
      const article = await prisma.article.create({ data })
      await prisma.articleAuthor.create({
        data: {
          articleId: article.id,
          name: authorName,
          affiliation: authorAffiliation,
          isCorresponding: true,
          order: 0,
        },
      })

      // Add references
      await prisma.articleReference.createMany({
        data: [
          { articleId: article.id, text: 'Smith J, et al. (2023). Foundational work in the field. Nature. 600:123-135.', order: 0 },
          { articleId: article.id, text: 'Johnson A, Williams B. (2022). Prior studies in this area. NEJM. 387:1456-1468.', order: 1 },
          { articleId: article.id, text: 'World Health Organization. (2024). Global health statistics. Geneva: WHO Press.', order: 2 },
        ],
      })
    }
  }

  console.log('✅ Articles seeded')

  // ==================== MANUSCRIPTS ====================
  const manuscripts = [
    {
      manuscriptId: 'BIOMED-2026-0001',
      title: 'Epigenetic Regulation of Inflammatory Gene Expression in Rheumatoid Arthritis',
      abstract: 'This study investigates the role of DNA methylation and histone modification patterns in the epigenetic regulation of key inflammatory genes in rheumatoid arthritis (RA) synovial fibroblasts.',
      keywords: 'epigenetics, rheumatoid arthritis, DNA methylation, histone modification, inflammation',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal1.id,
      submitterId: author.id,
      status: 'UNDER_REVIEW' as const,
      submittedAt: new Date('2026-06-01'),
      license: 'CC_BY' as const,
      apcConfirmed: true,
      coverLetter: 'We submit our manuscript investigating epigenetic regulation in RA...',
      conflictOfInterest: 'None declared.',
      fundingStatement: 'Funded by Arthritis Foundation.',
      ethicsStatement: 'Approved by IRB.',
      dataAvailability: 'Data available upon request.',
    },
    {
      manuscriptId: 'AGVET-2026-0002',
      title: 'Antimicrobial Resistance Patterns in Poultry-Associated Salmonella: A Farm-to-Fork Study',
      abstract: 'We conducted a comprehensive farm-to-fork investigation of antimicrobial resistance in Salmonella isolates from poultry supply chains.',
      keywords: 'Salmonella, antimicrobial resistance, poultry, food safety, One Health',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal2.id,
      submitterId: author.id,
      status: 'UNDER_EDITORIAL_SCREENING' as const,
      submittedAt: new Date('2026-06-10'),
      license: 'CC_BY' as const,
      apcConfirmed: true,
      coverLetter: 'We present our farm-to-fork antimicrobial resistance study...',
      conflictOfInterest: 'None.',
      fundingStatement: 'FAO research grant.',
      ethicsStatement: 'Appropriate approvals obtained.',
      dataAvailability: 'Data in supplementary.',
    },
    {
      manuscriptId: 'ENGAI-2026-0003',
      title: 'Federated Learning for Privacy-Preserving Medical Image Analysis Across Hospital Networks',
      abstract: 'A federated learning framework enabling collaborative training of medical imaging models across hospital networks without sharing sensitive patient data.',
      keywords: 'federated learning, medical imaging, privacy, deep learning, hospital networks',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal3.id,
      submitterId: extraAuthor.id,
      status: 'SUBMITTED' as const,
      submittedAt: new Date('2026-06-15'),
      license: 'CC_BY' as const,
      apcConfirmed: false,
      waiverRequested: true,
      coverLetter: 'We submit our federated learning manuscript...',
      conflictOfInterest: 'None declared.',
      fundingStatement: 'NSF grant.',
      ethicsStatement: 'Multi-site IRB approved.',
      dataAvailability: 'Model weights publicly available.',
    },
    {
      manuscriptId: 'PUBH-2026-0004',
      title: 'Mental Health Outcomes of Adolescents Following Natural Disasters: A Longitudinal Study',
      abstract: 'This longitudinal study tracked mental health outcomes in adolescents aged 12-18 following a major earthquake.',
      keywords: 'mental health, adolescents, natural disasters, PTSD, longitudinal',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal4.id,
      submitterId: author.id,
      status: 'REVISION_REQUESTED' as const,
      submittedAt: new Date('2026-05-20'),
      license: 'CC_BY' as const,
      apcConfirmed: true,
      coverLetter: 'We submit our longitudinal study on adolescent mental health...',
      conflictOfInterest: 'None.',
      fundingStatement: 'NIMH R21 grant.',
      ethicsStatement: 'Parental consent and assent obtained.',
      dataAvailability: 'De-identified data available.',
    },
    {
      manuscriptId: 'BIOMED-2026-0005',
      title: 'CAR-T Cell Therapy Resistance Mechanisms in Diffuse Large B-Cell Lymphoma',
      abstract: 'We characterize mechanisms of resistance to CAR-T cell therapy in relapsed/refractory DLBCL through single-cell transcriptomic analysis.',
      keywords: 'CAR-T, lymphoma, resistance mechanisms, single-cell RNA-seq, immunotherapy',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal1.id,
      submitterId: author.id,
      status: 'ACCEPTED' as const,
      submittedAt: new Date('2026-04-15'),
      license: 'CC_BY' as const,
      apcConfirmed: true,
      coverLetter: 'We submit our CAR-T resistance mechanisms study...',
      conflictOfInterest: 'None declared.',
      fundingStatement: 'Leukemia & Lymphoma Society grant.',
      ethicsStatement: 'All patients provided informed consent.',
      dataAvailability: 'Single-cell data deposited at GEO.',
    },
    {
      manuscriptId: 'ENGAI-2026-0006',
      title: 'Carbon-Negative Concrete: Integrating Biochar and Bacterial Calcification',
      abstract: 'We present a carbon-negative concrete formulation integrating biochar and bacterial-induced calcium carbonate precipitation.',
      keywords: 'carbon-negative concrete, biochar, bacterial calcification, sustainable construction, CO2 sequestration',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal3.id,
      submitterId: extraAuthor.id,
      status: 'UNDER_TECHNICAL_CHECK' as const,
      submittedAt: new Date('2026-06-18'),
      license: 'CC_BY' as const,
      apcConfirmed: true,
      coverLetter: 'We submit our carbon-negative concrete research...',
      conflictOfInterest: 'None.',
      fundingStatement: 'Green Building Council grant.',
      ethicsStatement: 'No human subjects.',
      dataAvailability: 'Data in supplementary.',
    },
    {
      manuscriptId: 'PUBH-2026-0007',
      title: 'Telemedicine Integration in Primary Care Post-Pandemic: A Mixed-Methods Evaluation',
      abstract: 'A mixed-methods evaluation of telemedicine integration into primary care settings across 120 clinics.',
      keywords: 'telemedicine, primary care, mixed-methods, healthcare delivery, digital health',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal4.id,
      submitterId: author.id,
      status: 'DRAFT' as const,
      submittedAt: null,
      license: 'CC_BY' as const,
      apcConfirmed: false,
      coverLetter: '',
      conflictOfInterest: '',
      fundingStatement: '',
      ethicsStatement: '',
      dataAvailability: '',
    },
    {
      manuscriptId: 'BIOMED-2026-0008',
      title: 'Spatial Transcriptomics Reveals Tumor Microenvironment Architecture in Pancreatic Cancer',
      abstract: 'Using spatial transcriptomics, we mapped the tumor microenvironment (TME) architecture in treatment-naive pancreatic ductal adenocarcinoma.',
      keywords: 'spatial transcriptomics, pancreatic cancer, tumor microenvironment, PDAC, immune evasion',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal1.id,
      submitterId: author.id,
      status: 'REVIEWS_COMPLETED' as const,
      submittedAt: new Date('2026-05-01'),
      license: 'CC_BY' as const,
      apcConfirmed: true,
      coverLetter: 'We submit our spatial transcriptomics study...',
      conflictOfInterest: 'None declared.',
      fundingStatement: 'Pancreatic Cancer Action Network grant.',
      ethicsStatement: 'All samples obtained with full IRB approval and informed consent.',
      dataAvailability: 'Raw and processed data at GEO.',
    },
    {
      manuscriptId: 'AGVET-2026-0009',
      title: 'CRISPR-Enhanced Disease Resistance in Cassava: Implications for African Food Security',
      abstract: 'We applied CRISPR-Cas9 genome editing to develop cassava varieties with enhanced resistance to Cassava Brown Streak Disease.',
      keywords: 'CRISPR, cassava, disease resistance, food security, Africa',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal2.id,
      submitterId: extraAuthor.id,
      status: 'IN_PRODUCTION' as const,
      submittedAt: new Date('2026-03-10'),
      license: 'CC_BY' as const,
      apcConfirmed: true,
      coverLetter: 'We submit our CRISPR cassava study...',
      conflictOfInterest: 'None.',
      fundingStatement: 'Bill & Melinda Gates Foundation.',
      ethicsStatement: 'Regulatory approvals obtained in Uganda and Kenya.',
      dataAvailability: 'CRISPR constructs deposited at Addgene.',
    },
    {
      manuscriptId: 'ENGAI-2026-0010',
      title: 'Zero-Shot Cross-Lingual Transfer for Low-Resource African Languages',
      abstract: 'We investigate zero-shot cross-lingual transfer learning for NLP tasks in 28 low-resource African languages.',
      keywords: 'zero-shot learning, cross-lingual transfer, African languages, NLP, low-resource',
      articleType: 'ORIGINAL_RESEARCH' as const,
      journalId: journal3.id,
      submitterId: author.id,
      status: 'REJECTED' as const,
      submittedAt: new Date('2026-04-01'),
      license: 'CC_BY' as const,
      apcConfirmed: false,
      coverLetter: 'We submit our cross-lingual NLP research...',
      conflictOfInterest: 'None.',
      fundingStatement: 'Lacuna Fund grant.',
      ethicsStatement: 'Not applicable.',
      dataAvailability: 'Models and data at github.com/africanlp (placeholder).',
    },
  ]

  const createdManuscripts: Record<string, string> = {}
  for (const msData of manuscripts) {
    const existing = await prisma.manuscript.findUnique({ where: { manuscriptId: msData.manuscriptId } })
    if (!existing) {
      const ms = await prisma.manuscript.create({ data: msData })
      createdManuscripts[msData.manuscriptId] = ms.id
      await prisma.manuscriptAuthor.create({
        data: {
          manuscriptId: ms.id,
          name: msData.submitterId === author.id ? 'Dr. Sarah Chen' : 'Dr. Raj Patel',
          email: msData.submitterId === author.id ? 'author@celx.test' : 'author2@celx.test',
          affiliation: msData.submitterId === author.id ? 'University of Cambridge' : 'IIT Bombay',
          isCorresponding: true,
          order: 0,
        },
      })
    } else {
      createdManuscripts[msData.manuscriptId] = existing.id
    }
  }

  console.log('✅ Manuscripts seeded')

  // ==================== REVIEWER INVITATIONS & REVIEWS ====================
  const ms1Id = createdManuscripts['BIOMED-2026-0001']
  const ms8Id = createdManuscripts['BIOMED-2026-0008']

  const inv1 = await prisma.reviewerInvitation.upsert({
    where: { id: 'inv-1-placeholder' },
    update: {},
    create: {
      id: 'inv-1-placeholder',
      manuscriptId: ms1Id,
      reviewerId: reviewer.id,
      invitedById: editor.id,
      status: 'ACCEPTED',
      dueDate: new Date('2026-07-15'),
      respondedAt: new Date('2026-06-05'),
    },
  })

  const inv2 = await prisma.reviewerInvitation.upsert({
    where: { id: 'inv-2-placeholder' },
    update: {},
    create: {
      id: 'inv-2-placeholder',
      manuscriptId: ms1Id,
      reviewerId: extraReviewer.id,
      invitedById: editor.id,
      status: 'COMPLETED',
      dueDate: new Date('2026-07-01'),
      respondedAt: new Date('2026-06-04'),
    },
  })

  const inv3 = await prisma.reviewerInvitation.upsert({
    where: { id: 'inv-3-placeholder' },
    update: {},
    create: {
      id: 'inv-3-placeholder',
      manuscriptId: ms8Id,
      reviewerId: reviewer.id,
      invitedById: editor.id,
      status: 'COMPLETED',
      dueDate: new Date('2026-06-20'),
      respondedAt: new Date('2026-05-10'),
    },
  })

  const inv4 = await prisma.reviewerInvitation.upsert({
    where: { id: 'inv-4-placeholder' },
    update: {},
    create: {
      id: 'inv-4-placeholder',
      manuscriptId: ms8Id,
      reviewerId: extraReviewer.id,
      invitedById: editor.id,
      status: 'COMPLETED',
      dueDate: new Date('2026-06-20'),
      respondedAt: new Date('2026-05-10'),
    },
  })

  const inv5 = await prisma.reviewerInvitation.upsert({
    where: { id: 'inv-5-placeholder' },
    update: {},
    create: {
      id: 'inv-5-placeholder',
      manuscriptId: createdManuscripts['BIOMED-2026-0005'],
      reviewerId: reviewer.id,
      invitedById: editor.id,
      status: 'COMPLETED',
      dueDate: new Date('2026-05-20'),
      respondedAt: new Date('2026-04-20'),
    },
  })

  // Reviews
  await prisma.review.upsert({
    where: { id: 'rev-1-placeholder' },
    update: {},
    create: {
      id: 'rev-1-placeholder',
      manuscriptId: ms8Id,
      reviewerId: reviewer.id,
      invitationId: inv3.id,
      originalityScore: 5,
      methodologyScore: 4,
      dataQualityScore: 5,
      clarityScore: 4,
      ethicalConcerns: 'None identified.',
      statisticalConcerns: 'Statistical methods are appropriate and well-described.',
      commentsToAuthor: 'This is an excellent piece of work. The spatial transcriptomics approach is well-suited to characterize TME architecture. Minor suggestion: please clarify the normalization approach for cross-patient comparisons.',
      confidentialComments: 'I recommend acceptance with minor revisions. Strong manuscript.',
      recommendation: 'ACCEPT',
      conflictOfInterest: 'None declared.',
      submittedAt: new Date('2026-06-01'),
      isSubmitted: true,
    },
  })

  await prisma.review.upsert({
    where: { id: 'rev-2-placeholder' },
    update: {},
    create: {
      id: 'rev-2-placeholder',
      manuscriptId: ms8Id,
      reviewerId: extraReviewer.id,
      invitationId: inv4.id,
      originalityScore: 4,
      methodologyScore: 5,
      dataQualityScore: 4,
      clarityScore: 5,
      ethicalConcerns: 'Ethics approvals properly documented.',
      statisticalConcerns: 'Minor: please report confidence intervals for key findings.',
      commentsToAuthor: 'Well-written manuscript with strong methodological foundation. Please address: 1) The comparison cohort selection could be better justified. 2) Add survival analysis as supplementary.',
      confidentialComments: 'Accept after minor revisions.',
      recommendation: 'MINOR_REVISION',
      conflictOfInterest: 'None.',
      submittedAt: new Date('2026-06-02'),
      isSubmitted: true,
    },
  })

  await prisma.review.upsert({
    where: { id: 'rev-3-placeholder' },
    update: {},
    create: {
      id: 'rev-3-placeholder',
      manuscriptId: createdManuscripts['BIOMED-2026-0005'],
      reviewerId: reviewer.id,
      invitationId: inv5.id,
      originalityScore: 5,
      methodologyScore: 5,
      dataQualityScore: 5,
      clarityScore: 5,
      ethicalConcerns: 'No concerns.',
      statisticalConcerns: 'Rigorous statistical analysis.',
      commentsToAuthor: 'Outstanding work characterizing CAR-T resistance mechanisms. This is a landmark study.',
      confidentialComments: 'Accept without revision.',
      recommendation: 'ACCEPT',
      conflictOfInterest: 'None.',
      submittedAt: new Date('2026-05-10'),
      isSubmitted: true,
    },
  })

  await prisma.review.upsert({
    where: { id: 'rev-4-placeholder' },
    update: {},
    create: {
      id: 'rev-4-placeholder',
      manuscriptId: createdManuscripts['PUBH-2026-0004'],
      reviewerId: extraReviewer.id,
      invitationId: null,
      originalityScore: 3,
      methodologyScore: 3,
      dataQualityScore: 3,
      clarityScore: 4,
      ethicalConcerns: 'Consent documentation should be more detailed.',
      statisticalConcerns: 'Missing power calculation justification. Multiple comparisons not adequately addressed.',
      commentsToAuthor: 'The study addresses an important topic. Major revisions needed: 1) Strengthen statistical methodology 2) Address missing data handling 3) Provide power calculations 4) Clarify consent procedures',
      confidentialComments: 'Major revision needed. Core methodology has gaps.',
      recommendation: 'MAJOR_REVISION',
      conflictOfInterest: 'None.',
      submittedAt: new Date('2026-06-05'),
      isSubmitted: true,
    },
  })

  await prisma.review.upsert({
    where: { id: 'rev-5-placeholder' },
    update: {},
    create: {
      id: 'rev-5-placeholder',
      manuscriptId: createdManuscripts['ENGAI-2026-0010'],
      reviewerId: reviewer.id,
      invitationId: null,
      originalityScore: 2,
      methodologyScore: 2,
      dataQualityScore: 2,
      clarityScore: 3,
      ethicalConcerns: 'None.',
      statisticalConcerns: 'Inadequate benchmarking.',
      commentsToAuthor: 'While the topic is relevant, the manuscript has fundamental methodological issues. The zero-shot evaluation does not follow standard protocols. The comparison baselines are outdated. Recommend rejection and substantial rewrite.',
      confidentialComments: 'Reject. Not ready for publication in current form.',
      recommendation: 'REJECT',
      conflictOfInterest: 'None.',
      submittedAt: new Date('2026-05-01'),
      isSubmitted: true,
    },
  })

  console.log('✅ Reviews seeded')

  // ==================== EDITORIAL DECISIONS ====================
  await prisma.editorialDecision.upsert({
    where: { id: 'dec-1-placeholder' },
    update: {},
    create: {
      id: 'dec-1-placeholder',
      manuscriptId: createdManuscripts['PUBH-2026-0004'],
      editorId: editor.id,
      decisionType: 'MAJOR_REVISION',
      decisionLetter: `Dear Dr. Chen,

Thank you for submitting your manuscript "Mental Health Outcomes of Adolescents Following Natural Disasters" to the Journal of Public Health and Clinical Studies.

After careful editorial review and consideration of peer review reports, we request major revisions. The reviewers have raised important methodological concerns that must be addressed before the manuscript can be considered for publication.

Key revisions required:
1. Provide statistical power calculations
2. Address missing data handling strategy
3. Correct for multiple comparisons
4. Strengthen the informed consent documentation

Please submit your revised manuscript within 60 days.

Best regards,
Prof. Elena Vasquez
Editor-in-Chief`,
      internalNote: 'Strong topic, weak methodology. Authors should be able to address.',
      attachReviewerComments: true,
    },
  })

  await prisma.editorialDecision.upsert({
    where: { id: 'dec-2-placeholder' },
    update: {},
    create: {
      id: 'dec-2-placeholder',
      manuscriptId: createdManuscripts['BIOMED-2026-0005'],
      editorId: editor.id,
      decisionType: 'ACCEPT',
      decisionLetter: `Dear Dr. Chen,

We are delighted to inform you that your manuscript "CAR-T Cell Therapy Resistance Mechanisms in Diffuse Large B-Cell Lymphoma" has been accepted for publication in the Journal of Biomedical and Translational Research.

This is an excellent contribution to the field and the reviewers were unanimously impressed by the quality and significance of your work.

Your manuscript will now be sent to our production team for typesetting and final preparation.

Congratulations!

Prof. Elena Vasquez
Editor-in-Chief`,
      internalNote: 'Excellent manuscript. Fast-track to production.',
      attachReviewerComments: true,
    },
  })

  await prisma.editorialDecision.upsert({
    where: { id: 'dec-3-placeholder' },
    update: {},
    create: {
      id: 'dec-3-placeholder',
      manuscriptId: createdManuscripts['ENGAI-2026-0010'],
      editorId: editor.id,
      decisionType: 'REJECT',
      decisionLetter: `Dear Dr. Chen,

Thank you for submitting your manuscript to the Journal of Engineering, AI and Applied Technologies.

After careful peer review, we are unable to accept your manuscript in its current form. The reviewers identified fundamental methodological concerns including non-standard evaluation protocols and outdated benchmarks.

We encourage you to substantially revise the methodology and consider resubmission to an appropriate venue.

Prof. Elena Vasquez
Editor-in-Chief`,
      internalNote: 'Reviewer consensus: reject. Methodology insufficient.',
      attachReviewerComments: true,
    },
  })

  console.log('✅ Editorial decisions seeded')

  // ==================== INVOICES ====================
  await prisma.invoice.upsert({
    where: { invoiceNumber: 'INV-2026-0001' },
    update: {},
    create: {
      invoiceNumber: 'INV-2026-0001',
      userId: author.id,
      manuscriptId: createdManuscripts['BIOMED-2026-0005'],
      amount: 850,
      taxAmount: 0,
      totalAmount: 850,
      currency: 'USD',
      status: 'PAID',
      notes: 'APC for accepted manuscript BIOMED-2026-0005',
      dueDate: new Date('2026-05-30'),
      paidAt: new Date('2026-05-25'),
    },
  })

  await prisma.invoice.upsert({
    where: { invoiceNumber: 'INV-2026-0002' },
    update: {},
    create: {
      invoiceNumber: 'INV-2026-0002',
      userId: extraAuthor.id,
      manuscriptId: createdManuscripts['AGVET-2026-0009'],
      amount: 750,
      taxAmount: 0,
      totalAmount: 750,
      currency: 'USD',
      status: 'PENDING',
      notes: 'APC for manuscript AGVET-2026-0009',
      dueDate: new Date('2026-07-15'),
    },
  })

  await prisma.invoice.upsert({
    where: { invoiceNumber: 'INV-2026-0003' },
    update: {},
    create: {
      invoiceNumber: 'INV-2026-0003',
      userId: author.id,
      manuscriptId: createdManuscripts['BIOMED-2026-0001'],
      amount: 850,
      taxAmount: 0,
      totalAmount: 850,
      currency: 'USD',
      status: 'WAIVER_REQUESTED',
      notes: 'APC waiver requested for BIOMED-2026-0001',
      dueDate: new Date('2026-07-30'),
    },
  })

  // Service orders for invoices
  const svcOrder1 = await prisma.serviceOrder.upsert({
    where: { id: 'svc-1-placeholder' },
    update: {},
    create: {
      id: 'svc-1-placeholder',
      userId: author.id,
      serviceType: 'ENGLISH_EDITING',
      manuscriptTitle: 'Epigenetic Regulation of Inflammatory Gene Expression',
      description: 'Please review and edit my manuscript for English language clarity and academic tone.',
      urgency: 'normal',
      quoteAmount: 120,
      status: 'IN_PROGRESS',
    },
  })

  const svcOrder2 = await prisma.serviceOrder.upsert({
    where: { id: 'svc-2-placeholder' },
    update: {},
    create: {
      id: 'svc-2-placeholder',
      userId: extraAuthor.id,
      serviceType: 'STATISTICAL_ANALYSIS',
      manuscriptTitle: 'Zero-Shot Cross-Lingual Transfer',
      description: 'Need statistical analysis review and additional tests for cross-lingual benchmark data.',
      urgency: 'express',
      quoteAmount: 280,
      status: 'QUOTE_SENT',
    },
  })

  await prisma.serviceOrder.upsert({
    where: { id: 'svc-3-placeholder' },
    update: {},
    create: {
      id: 'svc-3-placeholder',
      userId: author.id,
      serviceType: 'SCHEMATIC_DIAGRAM',
      manuscriptTitle: 'CAR-T Cell Therapy Resistance',
      description: 'Need professional schematic diagrams for the CAR-T mechanism figures.',
      urgency: 'urgent',
      quoteAmount: 350,
      status: 'DELIVERED',
      deliveredAt: new Date('2026-05-20'),
    },
  })

  await prisma.serviceOrder.upsert({
    where: { id: 'svc-4-placeholder' },
    update: {},
    create: {
      id: 'svc-4-placeholder',
      userId: extraAuthor.id,
      serviceType: 'MANUSCRIPT_FORMATTING',
      manuscriptTitle: 'Federated Learning for Privacy-Preserving Medical Image Analysis',
      description: 'Format manuscript according to JEAAT author guidelines.',
      urgency: 'normal',
      quoteAmount: 80,
      status: 'COMPLETED',
      deliveredAt: new Date('2026-06-01'),
    },
  })

  await prisma.serviceOrder.upsert({
    where: { id: 'svc-5-placeholder' },
    update: {},
    create: {
      id: 'svc-5-placeholder',
      userId: author.id,
      serviceType: 'COVER_LETTER',
      manuscriptTitle: 'Spatial Transcriptomics Reveals Tumor Microenvironment',
      description: 'Help draft a compelling cover letter for the spatial transcriptomics manuscript.',
      urgency: 'normal',
      quoteAmount: 60,
      status: 'REQUESTED',
    },
  })

  await prisma.invoice.upsert({
    where: { invoiceNumber: 'INV-2026-0004' },
    update: {},
    create: {
      invoiceNumber: 'INV-2026-0004',
      userId: author.id,
      serviceOrderId: svcOrder1.id,
      amount: 120,
      taxAmount: 12,
      totalAmount: 132,
      currency: 'USD',
      status: 'PAID',
      notes: 'English editing service',
      paidAt: new Date('2026-06-10'),
    },
  })

  await prisma.invoice.upsert({
    where: { invoiceNumber: 'INV-2026-0005' },
    update: {},
    create: {
      invoiceNumber: 'INV-2026-0005',
      userId: extraAuthor.id,
      serviceOrderId: svcOrder2.id,
      amount: 280,
      taxAmount: 28,
      totalAmount: 308,
      currency: 'USD',
      status: 'PENDING',
      notes: 'Statistical analysis service',
      dueDate: new Date('2026-07-01'),
    },
  })

  console.log('✅ Service orders & invoices seeded')

  // ==================== ANNOUNCEMENTS ====================
  await prisma.announcement.createMany({
    data: [
      {
        title: 'CleX Platform Launch',
        content: 'We are excited to announce the official launch of the CleX Research Publishing Platform. CleX offers transparent, ethical, open-access publishing across five high-quality journals.',
        isPublished: true,
      },
      {
        title: 'Special Issue: Artificial Intelligence in Healthcare',
        content: 'The Journal of Biomedical and Translational Research is now accepting submissions for a special issue on AI applications in clinical medicine. Submission deadline: September 30, 2026.',
        isPublished: true,
      },
      {
        title: 'New Journal: Student Journal of Emerging Research',
        content: 'CleX is proud to launch the Student Journal of Emerging Research (SJER), dedicated exclusively to undergraduate and postgraduate student researchers. Diamond open access — free to publish and read.',
        isPublished: true,
      },
      {
        title: 'Updated Peer Review Policy',
        content: 'Our peer review policy has been updated to reflect transparency standards. All journals now operate single-blind review by default, with double-blind available upon request.',
        isPublished: true,
      },
      {
        title: 'APC Waiver Program Expansion',
        content: 'CleX has expanded its APC waiver program to cover all authors from World Bank low-income countries. Apply during manuscript submission to receive a full waiver.',
        isPublished: true,
      },
    ],
  })

  console.log('✅ Announcements seeded')

  // ==================== NOTIFICATIONS ====================
  await prisma.notification.createMany({
    data: [
      {
        userId: author.id,
        title: 'Manuscript Submitted',
        message: 'Your manuscript BIOMED-2026-0001 has been successfully submitted.',
        category: 'SUBMISSION',
        isRead: true,
        link: '/dashboard/author/manuscripts',
      },
      {
        userId: author.id,
        title: 'Reviewer Invited',
        message: 'A reviewer has been invited to review your manuscript BIOMED-2026-0001.',
        category: 'REVIEWER_INVITATION',
        isRead: true,
        link: '/dashboard/author/manuscripts',
      },
      {
        userId: author.id,
        title: 'Revision Requested',
        message: 'The editor has requested major revisions for PUBH-2026-0004.',
        category: 'EDITORIAL_DECISION',
        isRead: false,
        link: '/dashboard/author/revisions',
      },
      {
        userId: author.id,
        title: 'Manuscript Accepted!',
        message: 'Congratulations! Your manuscript BIOMED-2026-0005 has been accepted for publication.',
        category: 'ACCEPTANCE',
        isRead: false,
        link: '/dashboard/author/manuscripts',
      },
      {
        userId: reviewer.id,
        title: 'Review Invitation',
        message: 'You have been invited to review manuscript BIOMED-2026-0001.',
        category: 'REVIEWER_INVITATION',
        isRead: true,
        link: '/dashboard/reviewer',
      },
      {
        userId: editor.id,
        title: 'Reviews Completed',
        message: 'All reviews are complete for manuscript BIOMED-2026-0008. Please make your editorial decision.',
        category: 'REVIEW_SUBMITTED',
        isRead: false,
        link: '/dashboard/editor/manuscripts',
      },
    ],
  })

  console.log('✅ Notifications seeded')

  // ==================== SYSTEM SETTINGS ====================
  await prisma.systemSetting.upsert({
    where: { key: 'platform_name' },
    update: {},
    create: { key: 'platform_name', value: 'CleX Research Publishing Platform' },
  })
  await prisma.systemSetting.upsert({
    where: { key: 'contact_email' },
    update: {},
    create: { key: 'contact_email', value: 'editorial@clex.org' },
  })
  await prisma.systemSetting.upsert({
    where: { key: 'submission_open' },
    update: {},
    create: { key: 'submission_open', value: 'true' },
  })

  console.log('✅ System settings seeded')
  console.log('\n🎉 Seed completed successfully!\n')
  console.log('Demo credentials:')
  console.log('  Super Admin:  admin@celx.test / password123')
  console.log('  Author:       author@celx.test / password123')
  console.log('  Reviewer:     reviewer@celx.test / password123')
  console.log('  Editor:       editor@celx.test / password123')
  console.log('  Office:       office@celx.test / password123')
  console.log('  Production:   production@celx.test / password123')
  console.log('  Finance:      finance@celx.test / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
