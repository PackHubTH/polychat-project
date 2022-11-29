const MaximumString = (word, maximum) => {
    if (word.length > maximum) {
        return word.slice(0, maximum) + '...';
    } else {
        return word;
    }
};

export { MaximumString };
