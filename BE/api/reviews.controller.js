import ReviewsDAO from "../dao/reviewsDAO.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;
      console.log("movieid", movieId);
      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {};
      let review = await ReviewsDAO.getReview(id);
      if (!review) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(review);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id;

      // Validate ObjectId format
      if (!ObjectId.isValid(reviewId)) {
        res.status(400).json({ error: "Invalid review ID format" });
        return;
      }

      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      );

      // Handle case where review wasn't found
      if (reviewResponse.error) {
        res.status(404).json({ error: reviewResponse.error });
        return;
      }

      // Handle successful update
      if (reviewResponse.modifiedCount === 0) {
        res.status(400).json({ error: "No changes made to the review" });
        return;
      }

      res.json({ status: "success" });
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;

      // Validate ObjectId format
      if (!ObjectId.isValid(reviewId)) {
        res.status(400).json({ error: "Invalid review ID format" });
        return;
      }

      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);

      // Handle successful delete
      res.json({ status: "success" });
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);
      if (!reviews) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
