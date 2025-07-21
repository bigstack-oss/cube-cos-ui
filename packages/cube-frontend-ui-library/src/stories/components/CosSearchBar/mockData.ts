export const mockOptions = [
  {
    label: 'Suggestion',
    option: '[0,0,0]',
    description: 'Description',
  },
  {
    label: 'Recommendation',
    option: '[1,1,1]',
    description: 'Description',
  },
  {
    label: 'Alternative',
    option: '[2,2,2]',
    description: 'Description',
  },
  {
    label: 'Popular Choice',
    option: '[3,3,3]',
    description: 'Description',
  },
  {
    label: 'Recent Search',
    option: '[4,4,4]',
    description: 'Description',
  },
  {
    label: 'Trending',
    option: '[5,5,5]',
    description: 'Description',
  },
]

export const mockCategories = ['Category 1', 'Category 2', 'Category 3']

export const mockSuggestions: {
  type: 'suggestion'
  value: string
}[] = [
  { type: 'suggestion', value: 'Suggestion 1' },
  { type: 'suggestion', value: 'Suggestion 2' },
]

export const mockRecentSuggestions: {
  type: 'recentSuggestion'
  value: string
}[] = [
  { type: 'recentSuggestion', value: 'Recent Suggestion 1' },
  { type: 'recentSuggestion', value: 'Recent Suggestion 2' },
]
