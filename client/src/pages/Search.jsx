import React from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sideBar, setSideBar] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(sideBar);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl) {
      setSideBar((prevState) => ({
        ...prevState,
        searchTerm: searchTermFromUrl,
      }));
    }
    if (sortFromUrl) {
      setSideBar((prevState) => ({
        ...prevState,
        sort: sortFromUrl,
      }));
    }
    if (categoryFromUrl) {
      setSideBar((prevState) => ({
        ...prevState,
        category: categoryFromUrl,
      }));
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBar((prevState) => ({
        ...prevState,
        searchTerm: e.target.value,
      }));
    } else if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBar((prevState) => ({
        ...prevState,
        sort: order,
      }));
    } else if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSideBar((prevState) => ({
        ...prevState,
        category: category,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sideBar.searchTerm);
    urlParams.set("sort", sideBar.sort);
    urlParams.set("category", sideBar.category);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return
    }
    if (res.ok) {
      const data = await res.json();
      setPosts((prevState) => [...prevState, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search...."
              id="searchTerm"
              type="text"
              value={sideBar.searchTerm}
              onChange={handleChange}
            ></TextInput>
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sideBar.sort} id="sort">
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sideBar.category}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
          <Button outline gradientDuoTone="tealToLime" type="submit">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Post Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p classname="text-xl text-gray-500">No Posts Found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading Posts...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button className="text-teal-500 text-lg hover:underline p-7 w-full" onClick={handleShowMore}>
              Show More!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
