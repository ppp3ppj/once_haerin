require "test_helper"

class HaerinsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @haerin = haerins(:one)
  end

  test "should get index" do
    get haerins_url
    assert_response :success
  end

  test "should get new" do
    get new_haerin_url
    assert_response :success
  end

  test "should create haerin" do
    assert_difference("Haerin.count") do
      post haerins_url, params: { haerin: { description: @haerin.description, title: @haerin.title } }
    end

    assert_redirected_to haerin_url(Haerin.last)
  end

  test "should show haerin" do
    get haerin_url(@haerin)
    assert_response :success
  end

  test "should get edit" do
    get edit_haerin_url(@haerin)
    assert_response :success
  end

  test "should update haerin" do
    patch haerin_url(@haerin), params: { haerin: { description: @haerin.description, title: @haerin.title } }
    assert_redirected_to haerin_url(@haerin)
  end

  test "should destroy haerin" do
    assert_difference("Haerin.count", -1) do
      delete haerin_url(@haerin)
    end

    assert_redirected_to haerins_url
  end
end
