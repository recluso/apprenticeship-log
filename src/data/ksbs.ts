// Knowledge, Skills and Behaviours (KSBs) from the apprenticeship standard
// ST1512 "Artificial intelligence (AI) and automation practitioner", Level 4,
// version 2.1: https://skillsengland.education.gov.uk/apprenticeships/st1512-v2-1
//
// `text` is the official wording (Crown copyright, Open Government Licence
// v3.0). `label` is a short plain-English summary used on badges and in
// lists. Log entries reference these by code in their `ksbs` frontmatter;
// the content schema rejects any code not listed here.

export type KsbType = 'knowledge' | 'skill' | 'behaviour';

export interface Ksb {
	type: KsbType;
	label: string;
	text: string;
}

export const KSB_STANDARD = {
	reference: 'ST1512',
	name: 'Artificial intelligence (AI) and automation practitioner',
	level: 4,
	version: '2.1',
	url: 'https://skillsengland.education.gov.uk/apprenticeships/st1512-v2-1',
};

export const KSBS = {
	K1: {
		type: 'knowledge',
		label: "Leadership's role in responsible AI",
		text: 'The role of organisational leadership in responsible AI adoption, including setting values, policy, and strategy. The business case for ethical AI adoption, including reputational risk, staff morale, and long-term sustainability.',
	},
	K2: {
		type: 'knowledge',
		label: 'Law, data protection & AI ethics',
		text: 'Legal and regulatory frameworks including employment rights, equality, and responsible automation, data protection and GDPR. Ethical principles and professional standards relevant to AI development such as fairness, transparency, and accountability.',
	},
	K3: {
		type: 'knowledge',
		label: 'Social & economic impact on roles',
		text: 'Understand the potential social and economic impacts of AI and automation on different roles, particularly for non-technical staff including change management principles.',
	},
	K4: {
		type: 'knowledge',
		label: 'Incremental change & piloting',
		text: 'Approaches for identifying and implementing incremental change, including piloting, evaluating solutions in relation to organisational constraints such as budget, time, and resources.',
	},
	K5: {
		type: 'knowledge',
		label: 'Spotting productivity opportunities',
		text: 'Methods to identify opportunities to enhance productivity such as improve processes, reduce waste, increase user or customer satisfaction or optimise outcomes.',
	},
	K6: {
		type: 'knowledge',
		label: "Augment, don't replace, people",
		text: 'The importance of designing AI and automation systems that augment rather than replace human work, where feasible.',
	},
	K7: {
		type: 'knowledge',
		label: 'Capabilities, benefits & risks of AI tools',
		text: 'The capabilities, benefits and risks of automation, AI and digital tools including responsible use, ethical considerations and the potential impact on the workforce.',
	},
	K8: {
		type: 'knowledge',
		label: 'On-premise, cloud & third-party solutions',
		text: 'The capabilities, risks and implications of on-premise, cloud-based and third party solutions.',
	},
	K9: {
		type: 'knowledge',
		label: 'AI concepts, models & limitations',
		text: 'AI and automation concepts, models and limitations. The impact adoption may have on workplace culture and wellbeing.',
	},
	K10: {
		type: 'knowledge',
		label: 'Sources of error & algorithmic bias',
		text: 'Sources of error and algorithmic bias, including how they may be affected by choice of dataset and methodologies applied, and the impact on the user and or organisation. Fairness metrics and mitigation approaches.',
	},
	K11: {
		type: 'knowledge',
		label: 'User requirements & accessibility',
		text: 'User requirements when designing and implementing AI and automation solutions including accessibility considerations.',
	},
	K12: {
		type: 'knowledge',
		label: 'Product lifecycle & user-centred design',
		text: 'Product development lifecycle including consideration of user experience (UX) principles such as user centred design (UCD), data informed design and experimental testing.',
	},
	K13: {
		type: 'knowledge',
		label: 'Assessing solution viability',
		text: 'How to assess the viability of solutions, for example testing and evaluating solutions, using test data and results, feasibility (time, cost, data quality and process maturity), and user testing.',
	},
	K14: {
		type: 'knowledge',
		label: 'Testing methodologies',
		text: 'Principles and application of testing methodologies and their application in practice.',
	},
	K15: {
		type: 'knowledge',
		label: 'Human oversight & human–AI collaboration',
		text: 'Principles of human oversight and human AI collaboration to achieve shared outcomes.',
	},
	K16: {
		type: 'knowledge',
		label: 'Feedback loops & human in the loop',
		text: 'Feedback and evaluation loops to improve systems, processes, productivity and performance including human in the loop safeguards.',
	},
	K17: {
		type: 'knowledge',
		label: 'Sustainable solution design',
		text: 'Principles for designing sustainable solutions to support organisational strategies and objectives.',
	},
	K18: {
		type: 'knowledge',
		label: 'Governance, security & risk',
		text: 'Governance principles to ensure accountability and compliance, including methods to identify system vulnerabilities and mitigate threats or risks to assets, data and cyber security.',
	},
	K19: {
		type: 'knowledge',
		label: 'Engaging & training non-technical staff',
		text: 'Engagement and training approaches used with non-technical staff to understand their roles, responsibilities, and concerns when AI automation solutions are proposed. Including best practice and methods to deliver training.',
	},
	K20: {
		type: 'knowledge',
		label: 'Creating guides & training resources',
		text: 'Methods to develop resources such as manuals, short explainers, chat-based guidance, interactive wikis and training materials.',
	},
	K21: {
		type: 'knowledge',
		label: 'Inclusive communication',
		text: 'Strategies for inclusive communication with stakeholders from diverse and non-technical backgrounds.',
	},
	K22: {
		type: 'knowledge',
		label: 'Collaborative working & prototypes',
		text: 'Collaborative working principles to explore AI and automation solutions and implement prototypes, pilots or proof of concepts.',
	},
	K23: {
		type: 'knowledge',
		label: 'Overreliance & automation bias',
		text: 'Mitigation strategies for post-deployment issues such as overreliance and automation bias.',
	},
	K24: {
		type: 'knowledge',
		label: 'Project & change management',
		text: 'Principles to support project and change management delivery.',
	},
	K25: {
		type: 'knowledge',
		label: 'Keeping up with technology trends',
		text: 'Approaches to maintaining up-to-date knowledge of existing, evolving and emerging technologies and sector trends for example peer learning, online forums, AI tool release notes.',
	},
	K26: {
		type: 'knowledge',
		label: 'Wellbeing & safe working',
		text: 'The benefits of wellbeing and safe working practices.',
	},
	K27: {
		type: 'knowledge',
		label: 'Assurance, auditability & documentation',
		text: 'Methods for assuring compliance in AI and automation projects, including documentation of model decision-making, conducting structured risk assessments, and aligning implementation with recognised AI assurance and governance frameworks. The importance of auditability, transparency, and accountability in organisational contexts.',
	},
	K28: {
		type: 'knowledge',
		label: 'Algorithmic impact & equality monitoring',
		text: 'Principles and practices of algorithmic impact assessment and workforce equality monitoring, including methods to identify, assess, and mitigate potential disproportionate impacts of automation and AI systems on different workforce groups. Organisational responsibilities under equality and employment law, and methods to evidence fairness and transparency in adoption.',
	},
	K29: {
		type: 'knowledge',
		label: 'Long-term monitoring (drift, bias, security)',
		text: 'Principles and practices for the long-term monitoring of AI and automation solutions, including detection and mitigation of risks such as model drift, emerging bias, degraded performance, and security vulnerabilities.',
	},
	S1: {
		type: 'skill',
		label: 'Data & information security procedures',
		text: 'Review, establish, follow and or amend policies and procedures on data and information security.',
	},
	S2: {
		type: 'skill',
		label: 'Ethical, safe & confidential working',
		text: 'Follow ethical, responsible and safe working practices respecting confidentiality and sensitive organisational matters.',
	},
	S3: {
		type: 'skill',
		label: 'Assessing whether automation is viable',
		text: 'Undertake analysis to identify if automation is viable. Including assessing risks such as data quality, process maturity and unintended consequences of AI automation projects, such as the impact on job roles.',
	},
	S4: {
		type: 'skill',
		label: 'Engaging non-technical staff',
		text: 'Engage with non-technical staff to understand their roles, responsibilities, and concerns when automation solutions are proposed and implemented. Adapt approach to support workforce needs when implementing solutions that impacts the workforce.',
	},
	S5: {
		type: 'skill',
		label: 'Supporting change',
		text: 'Support with the introduction, adaption, and implementation of change. Contribute to constructive dialogue between leaders and employees about the adoption of AI and automation solutions.',
	},
	S6: {
		type: 'skill',
		label: 'Process mapping & recommending solutions',
		text: 'Review and complete workflow and process mapping to identify problems or inefficiencies and recommend solutions including pilots, incremental changes and scaling opportunities.',
	},
	S7: {
		type: 'skill',
		label: 'Configuring automation tools',
		text: 'Use automation design tools to suit the organisational context to configure, adapt and implement AI or automation solutions, such as conversational agents, text processing AI, workflow automation platforms and cloud based SaaS or PaaS.',
	},
	S8: {
		type: 'skill',
		label: 'Writing & refining prompts',
		text: 'Create and refine prompts for AI tools, using iterative testing to achieve accurate and useful outputs.',
	},
	S9: {
		type: 'skill',
		label: 'Analytical & computational techniques',
		text: 'Apply analytical and computational techniques using tools and datasets to design, evaluate, and optimise automation solutions.',
	},
	S10: {
		type: 'skill',
		label: 'Integrating AI to manage data',
		text: 'Integrate AI and automation technologies to collect, process, and manage data effectively, enabling intelligent and efficient system operation.',
	},
	S11: {
		type: 'skill',
		label: 'Designing & testing digital workflows',
		text: 'Design, integrate, and test digital workflows and AI automation tools using APIs, connectors, or low-or no-code integration methods.',
	},
	S12: {
		type: 'skill',
		label: 'Iterating from testing & feedback',
		text: 'Iterate solutions based on testing and feedback to ensure reliability, security, accessibility, and alignment with organisational needs.',
	},
	S13: {
		type: 'skill',
		label: 'Spotting automation opportunities ethically',
		text: 'Identify opportunities to deliver automation. Support leaders in integrating ethical, empathetic approaches when decision-making.',
	},
	S14: {
		type: 'skill',
		label: 'Evaluating productivity opportunities',
		text: 'Support in the identification and evaluation of opportunities for increased productivity. For example, use of low-or no-code tools, streamlining processes and use of AI platforms.',
	},
	S15: {
		type: 'skill',
		label: 'Evidence-based suggestions',
		text: 'Make evidence based suggestions to support governance, outcomes and facilitate improvement for example cost benefit analysis.',
	},
	S16: {
		type: 'skill',
		label: 'Reporting productivity savings',
		text: 'Report on productivity and efficiency savings and the opportunities for automation and where applicable when automation does not improve experience or processes.',
	},
	S17: {
		type: 'skill',
		label: 'Sustainable, efficient solutions',
		text: 'Contribute to sustainable and efficient AI and automation solutions.',
	},
	S18: {
		type: 'skill',
		label: 'Delivering training',
		text: 'Support with the delivery of training to technical and non-technical user groups or audiences adapting content and format responding to feedback and organisational context.',
	},
	S19: {
		type: 'skill',
		label: 'Creating user guides & materials',
		text: 'Contribute to the creation and or adaption of resources such as user guides, training materials, process documents to meet user requirements.',
	},
	S20: {
		type: 'skill',
		label: 'Collaborative deployment & staff impact',
		text: 'Work collaboratively to deploy AI and automation strategies. Support where required to deal with the impact of automation for example retraining, redeployment, or upskilling of affected staff.',
	},
	S21: {
		type: 'skill',
		label: 'Data analysis & preparation',
		text: 'Undertake data analysis, preparation, and conversion to support automation solutions.',
	},
	S22: {
		type: 'skill',
		label: 'Explaining technical concepts clearly',
		text: 'Present and communicate information including the translation of technical concepts into accessible materials to support clear dialogue with stakeholders.',
	},
	S23: {
		type: 'skill',
		label: 'Working with others on human impact',
		text: 'Work with others to achieve agreed outcomes or outputs. Provide evidence-based analysis and insight to leaders on the likely human impacts of automation projects.',
	},
	S24: {
		type: 'skill',
		label: 'Project management & balanced briefings',
		text: 'Use project management principles, techniques and tools to support the development of clear, balanced communications and briefings, articulating both opportunities and risks.',
	},
	S25: {
		type: 'skill',
		label: 'Keeping up to date & evaluating vendors',
		text: 'Keep up to date with existing, evolving, emerging technologies and sector trends in AI, automation and technology including methods to evaluate vendor and supplier solutions.',
	},
	S26: {
		type: 'skill',
		label: 'Ethical, human-centred design',
		text: 'Apply ethical and human-centred design principles when scoping, developing, and deploying automation and AI solutions, underpinned by robust governance.',
	},
	S27: {
		type: 'skill',
		label: 'Aligning business needs with technology',
		text: 'Apply technical understanding to help align business needs with technical capabilities, supporting the development of solutions that are scalable, efficient, and aligned with the organisation’s strategic objectives.',
	},
	S28: {
		type: 'skill',
		label: 'Assurance & decision documentation',
		text: 'Undertake assurance activities to evidence responsible AI and automation, including maintaining clear documentation of design and decision-making, contributing to risk assessments, and applying assurance frameworks to support compliance with organisational, regulatory, and ethical standards.',
	},
	S29: {
		type: 'skill',
		label: 'Algorithmic impact & equality monitoring',
		text: 'Apply algorithmic impact assessment and workforce equality monitoring techniques when scoping, implementing, and reviewing AI and automation projects. Gather and analyse relevant workforce data, identify potential equality risks, and contribute evidence-based recommendations to support fair and inclusive adoption.',
	},
	B1: {
		type: 'behaviour',
		label: 'Empathy for staff affected by change',
		text: 'Demonstrates empathy by actively considering the perspectives and concerns of staff who may be impacted by AI-driven change. Acts responsibly, recognising organisational efficiency goals with fairness to employees.',
	},
	B2: {
		type: 'behaviour',
		label: 'Professionalism & confidentiality',
		text: 'Maintains professionalism and upholds confidentiality when discussing sensitive workforce impacts, showing respect for individual contributions.',
	},
	B3: {
		type: 'behaviour',
		label: 'Confidence to raise concerns',
		text: 'Demonstrates confidence in sharing concerns or alternative perspectives of self or others, even when under pressure to deliver efficiencies.',
	},
	B4: {
		type: 'behaviour',
		label: 'Balancing leadership & employee advocacy',
		text: 'Balances respect for leadership decisions with advocacy for employees.',
	},
	B5: {
		type: 'behaviour',
		label: 'Helping leaders see the wider impact',
		text: 'Support leaders to consider the impact of AI automation adoption, not just immediate organisational gains.',
	},
	B6: {
		type: 'behaviour',
		label: 'Curiosity & safe experimentation',
		text: 'Shows curiosity and initiative, experimenting with AI and automation, while ensuring such exploration is conducted safely, ethically, and with regard for potential impacts.',
	},
} satisfies Record<string, Ksb>;

export type KsbCode = keyof typeof KSBS;

export const KSB_CODES = Object.keys(KSBS) as [KsbCode, ...KsbCode[]];

export const KSB_TYPE_LABELS: Record<KsbType, string> = {
	knowledge: 'Knowledge',
	skill: 'Skills',
	behaviour: 'Behaviours',
};
