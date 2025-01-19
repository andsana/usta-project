import * as prismic from '@prismicio/client';

const repositoryName = 'usta-store';
const client = prismic.createClient(repositoryName);

export default client;
