class Api::V1::SearchController < ApplicationController
  def posts
    # @posts = Post.search(params[:q])
    # render json: @posts.as_json

    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    posts = Post.search(params[:q])

    total_count = posts.count

    posts = posts
      .order(created_at: :desc)
      .offset((page - 1) * per_page)
      .limit(per_page)

    render json: {
      posts: posts.as_json,
      current_page: page,
      per_page: per_page,
      total_posts: total_count,
      total_pages: (total_count.to_f / per_page).ceil
    }
  end
end
