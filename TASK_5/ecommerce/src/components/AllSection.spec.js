import { shallowMount } from '@vue/test-utils';
import AllSection from './AllSection.vue';

const sampleProducts = [
  {
    id: 1,
    title: 'Men Shirt',
    price: 29.99,
    description: 'A nice men shirt',
    category: "men's clothing",
    image: 'men-shirt.png',
    rating: { rate: 4, count: 100 }
  },
  {
    id: 2,
    title: 'Women Dress',
    price: 49.99,
    description: 'A beautiful dress',
    category: "women's clothing",
    image: 'women-dress.png',
    rating: { rate: 5, count: 80 }
  },
  {
    id: 3,
    title: 'Hat',
    price: 9.99,
    description: 'A cool hat',
    category: 'accessories',
    image: 'hat.png',
    rating: { rate: 3, count: 10 }
  }
];

describe('AllSection.vue', () => {
  it('renders product details for men\'s clothing', () => {
    const wrapper = shallowMount(AllSection, {
      propsData: { products: sampleProducts }
    });
    expect(wrapper.find('h2').text()).toBe('Men Shirt');
    expect(wrapper.find('.category').text()).toBe("men's clothing");
    expect(wrapper.find('.card-price').text()).toContain('29.99');
    expect(wrapper.find('.card-desc').text()).toBe('A nice men shirt');
  });

  it('renders product details for women\'s clothing after nextProduct', async () => {
    const wrapper = shallowMount(AllSection, {
      propsData: { products: sampleProducts }
    });
    await wrapper.vm.nextProduct();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('h2').text()).toBe('Women Dress');
    expect(wrapper.find('.category').text()).toBe("women's clothing");
    expect(wrapper.find('.card-price').text()).toContain('49.99');
    expect(wrapper.find('.card-desc').text()).toBe('A beautiful dress');
  });

  it('shows unavailable message for non-clothing category', async () => {
    const wrapper = shallowMount(AllSection, {
      propsData: { products: sampleProducts }
    });
    await wrapper.vm.nextProduct();
    await wrapper.vm.nextProduct();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.card-desc-unavailable').exists()).toBe(true);
    expect(wrapper.find('.card-desc-unavailable').text()).toContain('unavailable');
  });

  it('shows unavailable message if products is empty', () => {
    const wrapper = shallowMount(AllSection, {
      propsData: { products: [] }
    });
    expect(wrapper.find('.card-desc-unavailable').exists()).toBe(true);
  });

  it('emits next-category when nextProduct is called at end', async () => {
    const wrapper = shallowMount(AllSection, {
      propsData: { products: sampleProducts }
    });
    await wrapper.vm.nextProduct();
    await wrapper.vm.nextProduct();
    await wrapper.vm.$nextTick();
    await wrapper.vm.nextProduct();
    expect(wrapper.emitted('next-category')).toBeTruthy();
  });

  it('renders correct number of filled circles for rating', () => {
    const wrapper = shallowMount(AllSection, {
      propsData: { products: sampleProducts }
    });
    const filled = wrapper.findAll('.circle.filled');
    expect(filled.length).toBe(4);
  });
});
