const notFound = (req, res) => {
    res.status(404).json({ message: "Page Not Found" });
};
export default notFound;
export { notFound };
