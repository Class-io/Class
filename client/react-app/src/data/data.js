export const programmingOptions = [
    { value: 'JavaScript', label: 'JavaScript'},
    { value: 'HTML', label: 'HTML'},
    { value: 'CSS', label: 'CSS'},
    { value: 'React', label: 'React'},
    { value: 'C++', label: 'C++'},
    { value: 'Java', label: 'Java'},
  ];

export const languageOptions = [
    { value: 'English', label: 'English', rating: 'safe' },
    { value: 'Russian', label: 'Russian', rating: 'good' },
    { value: 'Polish', label: 'Polish', rating: 'wild' },
    { value: 'Chinese', label: 'Chinese', rating: 'crazy' },
  ];

export const groupedOptions = [
    {
      label: 'Programming',
      options: programmingOptions,
    },
    {
      label: 'Language',
      options: languageOptions,
    },
  ];
