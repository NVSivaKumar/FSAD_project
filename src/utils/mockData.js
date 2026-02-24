export const initializeMockData = () => {
    const existingCareers = localStorage.getItem('careers');
    const needsUpdate = !existingCareers || !JSON.parse(existingCareers)[0].roadmap;

    if (needsUpdate) {
        localStorage.setItem('careers', JSON.stringify([
            {
                id: '1', title: 'Software Engineer', category: 'Technology', description: 'Design, develop, and maintain software systems and applications.', skills: ['JavaScript', 'React', 'Java', 'Problem Solving'], salary: '$100k - $150k',
                roadmap: [
                    { step: "1. Learn Fundamentals", resource: "CS50: Intro to Computer Science", url: "https://pll.harvard.edu/course/cs50-introduction-computer-science" },
                    { step: "2. Master a Language (JS/Python)", resource: "FreeCodeCamp Interactive Certifications", url: "https://www.freecodecamp.org/" },
                    { step: "3. Build Projects & APIs", resource: "The Odin Project - Full Stack Curriculum", url: "https://www.theodinproject.com/" },
                    { step: "4. Data Structures & Algorithms", resource: "LeetCode Prep", url: "https://leetcode.com/explore/" }
                ]
            },
            {
                id: '2', title: 'Data Scientist', category: 'Technology', description: 'Analyze complex data to help companies make better decisions.', skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'], salary: '$110k - $160k',
                roadmap: [
                    { step: "1. Learn Python & SQL", resource: "Kaggle Python Course", url: "https://www.kaggle.com/learn/python" },
                    { step: "2. Statistics & Probability", resource: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
                    { step: "3. Machine Learning", resource: "Andrew Ng's Machine Learning", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
                    { step: "4. Participate in Competitions", resource: "Kaggle Competitions", url: "https://www.kaggle.com/competitions" }
                ]
            },
            {
                id: '3', title: 'Product Manager', category: 'Business', description: 'Guide the success of a product and lead the cross-functional team.', skills: ['Leadership', 'Agile', 'Communication', 'Strategy'], salary: '$120k - $180k',
                roadmap: [
                    { step: "1. Agile & Scrum Basics", resource: "Scrum.org Open Assessments", url: "https://www.scrum.org/open-assessments" },
                    { step: "2. Product Strategy & Discovery", resource: "Silicon Valley Product Group Insights", url: "https://www.svpg.com/articles/" },
                    { step: "3. Analytics & Metrics", resource: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/" }
                ]
            },
            {
                id: '4', title: 'UX Designer', category: 'Design', description: 'Create meaningful and relevant experiences for users.', skills: ['Figma', 'User Research', 'Prototyping', 'Wireframing'], salary: '$90k - $140k',
                roadmap: [
                    { step: "1. Learn UX Principles", resource: "Google UX Design Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
                    { step: "2. Master Design Tools", resource: "Figma Academy / Crash Course", url: "https://www.figma.com/resources/learn-design/" },
                    { step: "3. Build a Portfolio", resource: "Awwwards Inspiration", url: "https://www.awwwards.com/" }
                ]
            },
            {
                id: '5', title: 'Financial Analyst', category: 'Finance', description: 'Guide businesses and individuals in decisions about expending money to attain profit.', skills: ['Excel', 'Financial Modeling', 'Accounting', 'Analysis'], salary: '$80k - $110k',
                roadmap: [
                    { step: "1. Accounting Fundamentals", resource: "Corporate Finance Institute (CFI)", url: "https://corporatefinanceinstitute.com/resources/accounting/" },
                    { step: "2. Advanced Excel", resource: "Excel Exposure", url: "https://excelexposure.com/" },
                    { step: "3. Financial Modeling", resource: "A Simple Model", url: "https://www.asimplemodel.com/" }
                ]
            },
        ]));
    }

    if (!localStorage.getItem('counselors')) {
        localStorage.setItem('counselors', JSON.stringify([
            { id: '1', name: 'Dr. Sarah Jenkins', expertise: 'Technology & Engineering', rating: 4.9, bio: '15+ years helping tech professionals navigate their careers.' },
            { id: '2', name: 'James Rodriguez', expertise: 'Business & Management', rating: 4.8, bio: 'Former Fortune 500 Executive turned career coach.' },
            { id: '3', name: 'Emily Chen', expertise: 'Design & Creative', rating: 4.9, bio: 'Helps creatives build standout portfolios and land top roles.' },
        ]));
    }

    if (!localStorage.getItem('appointments')) {
        localStorage.setItem('appointments', JSON.stringify([]));
    }
};

export const getCareers = () => JSON.parse(localStorage.getItem('careers') || '[]');
export const getCounselors = () => JSON.parse(localStorage.getItem('counselors') || '[]');
export const getAppointments = () => JSON.parse(localStorage.getItem('appointments') || '[]');

export const saveCareer = (career) => {
    const careers = getCareers();
    if (career.id) {
        const idx = careers.findIndex(c => c.id === career.id);
        if (idx > -1) careers[idx] = career;
        else careers.push(career);
    } else {
        career.id = Date.now().toString();
        careers.push(career);
    }
    localStorage.setItem('careers', JSON.stringify(careers));
};

export const deleteCareer = (id) => {
    const careers = getCareers().filter(c => c.id !== id);
    localStorage.setItem('careers', JSON.stringify(careers));
};

export const bookAppointment = (appointment) => {
    const appointments = getAppointments();
    appointment.id = Date.now().toString();
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
};

export const cancelAppointment = (id) => {
    const appointments = getAppointments().filter(a => a.id !== id);
    localStorage.setItem('appointments', JSON.stringify(appointments));
};
