class Post < ApplicationRecord
  has_one_attached :image
  # orders = { created_at: :desc }
  validates :title, :body, presence: true

  # scope :search, ->(param) { where("title LIKE ? or body LIKE ?", "%#{param}%", "%#{param}%").desc }
  scope :desc, -> { order(created_at: :desc) }

  def self.search(param)
    where("title LIKE ? or body LIKE ?", "%#{param}%", "%#{param}%").desc
  end


  # Returns the URL for the attached image, or nil if no image is attached.
  #
  # @return [String, nil] the URL of the image, or nil if not attached
  def image_url
    return nil unless image.attached?

    Rails.application.routes.url_helpers.rails_blob_url(image, host: request_base_url)
  end

  # Serializes the post as JSON, including the image_url.
  #
  # @param options [Hash] additional options to pass to as_json
  # @return [Hash] the post serialized as a hash with the image_url included
  def as_json(options = {})
    super(options).merge("image_url" => image_url)
  end



  private

  # Determines the base URL based on the environment.
  # In development/test, defaults to localhost:3000 if not explicitly set.
  def request_base_url
    ENV.fetch("BASE_URL") { "http://localhost:3001" }
  end
end
