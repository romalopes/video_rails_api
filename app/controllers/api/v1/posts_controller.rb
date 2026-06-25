class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    # @posts = Post.order(created_at: :desc)
    # render json: @posts.as_json


    page = params[:page].to_i
    page = 1 if page < 1

    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    @posts = Post
      .order(created_at: :desc)
      .offset((page - 1) * per_page)
      .limit(per_page)

    render json: {
      posts: @posts.as_json,
      current_page: page,
      per_page: per_page,
      total_posts: Post.count,
      total_pages: (Post.count.to_f / per_page).ceil
    }
  end

  # GET /posts/1
  def show
    render json: @post.as_json
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: api_v1_post_url(@post.id)
    else
      render json: @post.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_content
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.expect(post: [ :title, :body, :image ])
    end
end
