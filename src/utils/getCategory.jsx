export const getCategoryFromId = (questionId) => {
    const sectionNumber = parseInt(questionId.split('.')[0]);

    const categoryMap = {
        1: 'general',
        2: 'manual',
        3: 'accidents',
        4: 'ppe',
        5: 'health',
        6: 'fire',
        7: 'height',
        8: 'equipment',
        9: 'hazards',
        10: 'electro',
        11: 'environmental'
    };

    return categoryMap[sectionNumber] || 'unknown';
};