import questionsData from '../data/questions.json';

// Cache the lookup for performance
const categoryLookup = questionsData.categories.reduce((acc, cat) => {
    acc[cat.sectionNumber] = cat;
    return acc;
}, {});

export const getCategoryFromId = (questionId) => {
    const sectionNumber = parseInt(questionId.split('.')[0]);
    return categoryLookup[sectionNumber]?.id || 'unknown';
};

export const getCategoryName = (questionId) => {
    const sectionNumber = parseInt(questionId.split('.')[0]);
    return categoryLookup[sectionNumber]?.name || 'Unknown Category';
};

export const getCategoryById = (categoryId) => {
    return questionsData.categories.find(cat => cat.id === categoryId);
};