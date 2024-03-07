"use client";
import { postListingReview } from "@/slices/listingSlice";
import { showSignupModal } from "@/slices/userSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const ReviewBoxForm = ({ id }) => {

  const token = useSelector((state) => state.auth.token);
  const { postListingReviewLoading, postListingReviewError } = useSelector(
    (state) => state.listing
  );
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const dispatch = useDispatch();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      dispatch(
        postListingReview({
          data: { listingId: id, name, title, rating, review },
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

  return (
    <form className="comments_form mt30" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
                onChange={(e) => setRating(e.value)}
              />
            </div>
          </div>
        </div>

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
          {postListingReviewError && (
            <p style={{ color: "red" }}>{postListingReviewError}</p>
          )}
          <button
            disabled={postListingReviewLoading}
            type="submit"
            className="ud-btn btn-white2 pos-relative"
          >
            {postListingReviewLoading && (
              <div className="loading-btn-abs">
                <Image
                  src="/images/loading/loading.svg"
                  alt="loading"
                  height={40}
                  width={40}
                />
              </div>
            )}
            Submit Review
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewBoxForm;
