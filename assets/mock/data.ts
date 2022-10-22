const DATA = {
  storages: [
    {
      id: '1',
      title: 'Fridge',
      logo: require('../images/fridge.png'),
      items: [
        {
          id: '1',
          name: 'Pizza',
          created_date: '2022-10-14',
          expiry_date: '2022-10-18',
          quantity: 2,
        },
        {
          id: '2',
          name: 'Pepsi',
          created_date: '2022-10-14',
          expiry_date: '2022-06-12',
          quantity: 5,
        },
        {
          id: '3',
          name: 'Smirnoff ice',
          created_date: '2022-10-05',
          expiry_date: '2022-09-23',
          quantity: 3,
        },
      ],
    },
    {
      id: '2',
      title: 'Pantry',
      logo: require('../images/pantry.png'),
      items: [
        {
          id: '1',
          name: 'Beans',
          created_date: '2022-10-14',
          expiry_date: '2023-12-10',
          quantity: 2,
        },
        {
          id: '2',
          name: 'Rice',
          created_date: '2022-10-14',
          expiry_date: '2022-05-17',
          quantity: 2,
        },
      ],
    },
    {
      id: '3',
      title: 'Freezer',
      logo: require('../images/freezer.png'),
      items: [
        {
          id: '1',
          name: 'Hot dog',
          created_date: '2022-12-01',
          expiry_date: '2022-10-09',
          quantity: 5,
        },
        {
          id: '2',
          name: 'Beef',
          created_date: '2022-12-09',
          expiry_date: '2022-07-17',
          quantity: 2,
        },
        {
          id: '3',
          name: 'Ice cream',
          created_date: '2022-12-10',
          expiry_date: '2022-02-05',
          quantity: 1,
        },
      ],
    },
  ],
};

export default DATA;
