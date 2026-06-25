require "test_helper"

class SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get posts" do
    get api_v1_search_posts_url
    assert_response :success
  end
end
