require 'test_helper'

class UserTest < ActiveSupport::TestCase


  def setup
  	@user = User.new(name: "Test user", password: "test")
  end


  test "userオブジェクトがちゃんとできるか確認" do
    assert @user.valid?
  end


  test "名前　空白NG　チェック" do
    @user.name = ''
    assert_not @user.valid?
  end


  test "名前　長さ　チェック" do
    @user.name = 'a' * 11
    assert_not @user.valid?

    @user.name = 'a' * 10
    assert @user.valid?
  end

  
  test "パスワード　空白NG　チェック" do
    @user.password = ''
    assert_not @user.valid?
    # assert @user.valid?	
  end


end
