import Banner from '../../components/Banner/Banner.tsx';
import AboutUs from '../../components/AboutUs/AboutUs.tsx';
import ForInvestors from '../../components/ForInvestors/ForInvestors.tsx';
import Projects, { ProjectsSliceProps } from '../../components/Projects/Projects.tsx';

export const pageComponents = {
  banner: Banner,
  aboutus: AboutUs,
  forinvestors: ForInvestors,
  projectcards: Projects,
};


export const EmptySlice: ProjectsSliceProps = {
  primary: {
    title: '',
    description: '',
    filterall: '',
  },
  items: [],
};

export const MockSlice: ProjectsSliceProps = {
  primary: {
    title: 'Наши проекты',
    description: 'Здесь вы можете ознакомиться с нашими последними проектами.',
    filterall: 'Все проекты',
  },
  items: [
    {
      title: 'Проект 1',
      location: 'Москва',
      category: 'Жилые комплексы',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 2',
      location: 'Санкт-Петербург',
      category: 'Коммерческая недвижимость',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 3',
      location: 'Казань',
      category: 'Инфраструктура',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 4',
      location: 'Екатеринбург',
      category: 'Жилые комплексы',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 5',
      location: 'Новосибирск',
      category: 'Коммерческая недвижимость',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 6',
      location: 'Ростов-на-Дону',
      category: 'Инфраструктура',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 7',
      location: 'Краснодар',
      category: 'Жилые комплексы',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 8',
      location: 'Владивосток',
      category: 'Коммерческая недвижимость',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 9',
      location: 'Сочи',
      category: 'Инфраструктура',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 10',
      location: 'Владивосток',
      category: 'Коммерческая недвижимость',
      image: { url: '/public/photo-bg5.jpg' },
    },
    {
      title: 'Проект 11',
      location: 'Сочи',
      category: 'Инфраструктура',
      image: { url: '/public/photo-bg5.jpg' },
    },
  ],
};