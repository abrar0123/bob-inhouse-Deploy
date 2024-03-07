"use client";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { postSingleBlogsReview } from "@/slices/blogsSlice";
import { showSignupModal } from "@/slices/userSlice";

const ReviewBoxForm = ({ id }) => {
  const token = useSelector((state) => state.auth.token);

  const { singleBlogReview, singleBlogLoading } = useSelector(
    (state) => state.blogs
  );

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      dispatch(
        postSingleBlogsReview({
          data: { blogsId: id, name, title, rating, review },
          token,
        })
      );
      setName("");
      setTitle("");
      setRating(5);
      setReview("");
    } else {
      dispatch(showSignupModal());
    }
  };

  const inqueryType = [
    { value: "Five Star", label: "Five Star" },
    { value: "Four Star", label: "Four Star" },
    { value: "Three Sta", label: "Three Star" },
    { value: "Two Sta", label: "Two Star" },
    { value: "One Sta", label: "One Star" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <form className="comments_form mt30" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Blog Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="ibthemes21@gmail.com"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-md-6">
          <div className="widget-wrapper sideborder-dropdown mb-4">
            <label className="fw600 ff-heading mb-2">Rating</label>
            <div className="form-style2 input-group">
              <Select
                defaultValue={[inqueryType[0]]}
                name="colors"
                options={inqueryType}
                styles={customStyles}
                className="custom-react_select"
                classNamePrefix="select"
                required
                isClearable={false}
                // value={rating}
                // onChange={(e) => setRating(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Review</label>
            <textarea
              className="pt15"
              rows={6}
              placeholder="Write a Review"
              defaultValue={""}
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <button type="submit" className="ud-btn btn-white2">
            Submit Blog Review
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default ReviewBoxForm;
