export const fetchProjectsList = () => {
  return fetch("http://localhost:4000/projects").then((res) => {
    return res.json();
  });
};
