const Home = () => {
  const { VITE_APP_APIURL } = import.meta.env;
  return <div>Home:{VITE_APP_APIURL}</div>;
};

export default Home;
