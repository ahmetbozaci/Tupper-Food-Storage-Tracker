interface IData {
  id: number;
  title: string;
  subtitle: string;
  text: string;
}
const guideData: IData[] = [
  {
    id: 1,
    title: 'Temperature Storage',
    subtitle: 'Double-check your fridge’s temperature',
    text: 'Make sure your fridge thermometer is working correctly to prevent spoilage and reduce the risk of food-borne illness. The ideal temperature is 35 to 38 degrees Fahrenheit, cold enough to keep foods fresh without freezing.',
  },
  {
    id: 2,
    title: 'Fruits',
    subtitle:
      'Certain fruits keep better in the fridge, while others do better at room temperature',
    text: 'Storing fruits properly reduces waste. Citrus, tomatoes, and avocados, for example, are better left unrefrigerated, but cucumbers, peppers, and carrots are better stored in the fridge. Certain foods such as apples and pears can handle either.',
  },
  {
    id: 3,
    title: 'Vegetables',
    subtitle: 'Wrap your greens in paper towels',
    text: 'To prevent slimy residue from accumulating in your bag of lettuce, spinach, or other leafy greens, leave a few paper towels inside to soak up excess moisture. Storing greens with paper towels helps maintain a healthy level of moisture, keeping them crisp and unwithered.',
  },
  {
    id: 4,
    title: 'Meats',
    subtitle: 'Meat Storage',
    text: "Store raw meat, poultry and seafood on the bottom shelf of the refrigerator so juices don't drip onto other foods and cause cross-contamination. If meat is not going to be used within a few days after purchase, it should be frozen as soon as possible to preserve optimal quality.",
  },
  {
    id: 5,
    title: 'Other',
    subtitle: 'Store nuts in freezer',
    text: 'Nuts have a naturally high fat content and can spoil within a few days if exposed to heat and sunlight. Rancid nuts are destined for the garbage, which is a shame, especially since they can be a pricey item. Storing all kinds of nuts in the freezer allows for the purchase of larger packages at a discount and keeps them in good condition for up to a few months.',
  },
];
export default guideData;
