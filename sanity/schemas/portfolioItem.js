export default {
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tinten', value: 'Tinten' },
          { title: 'Wrappen', value: 'Wrappen' },
          { title: 'Detailing', value: 'Detailing' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      description: 'Car brand (e.g., Porsche, Audi, Mercedes)',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'For best results in the grid layout, please crop to 1:1 aspect ratio.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'altText',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility. Describe what is shown in the image.',
    },
  ],
};
