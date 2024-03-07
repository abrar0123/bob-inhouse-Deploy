"use client";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { postSingleBlogsReview } from "@/slices/blogsSlice";
import { postUserReviews, showSignupModal } from "@/slices/userSlice";

const HomeReviewForm = ({ id }) => {
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.user);
  const [ratingDisplay, setratingDisplay] = useState({
    value: "five star",
    label: "Five Star",
  });

  const [reviewForm, setReviewForm] = useState({
    userId: "",
    name: "",
    title: "",
    rating: 5,
    review: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token && reviewForm.userId?.length > 0) {
      dispatch(
        postUserReviews({
          data: reviewForm,
          token,
        })
      );
      setReviewForm({
        name: "",
        title: "",
        review: "",
      });
    } else {
      dispatch(showSignupModal());
    }
  };

  const inqueryType = [
    { value: 5, label: "Five Star" },
    { value: 4, label: "Four Star" },
    { value: 3, label: "Three Star" },
    { value: 2, label: "Two Star" },
    { value: 1, label: "One Star" },
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
    <form className="comments_form mb50" onSubmit={handleSubmit}>
      <div className="row ">
        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2 ">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={reviewForm.name}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, name: e.target.value })
              }
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
              value={reviewForm.title}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, title: e.target.value })
              }
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
                value={ratingDisplay}
                onChange={(e) => {
                  setReviewForm({ ...reviewForm, rating: e.value });
                  setratingDisplay(e);
                }}
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
              value={reviewForm.review}
              onChange={(e) => {
                setReviewForm({
                  ...reviewForm,
                  userId: user?._id,
                  review: e.target.value,
                });
              }}
            />
          </div>
          <button type="submit" className="ud-btn btn-white2">
            Submit Your Review
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default HomeReviewForm;
