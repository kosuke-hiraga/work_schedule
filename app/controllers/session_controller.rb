class SessionController < ApplicationController
	include SessionHelper

  #ログイン用ページを表示するだけ
	def new
	  # session[:name] = login_infomation.name
   #  session[:password] = login_infomation.password
  end


  #セッションを作成し、ユーザーページに遷移する
  def create

  	@user = User.new()
  	# session[:name] = params[:name]
  	# session[:password] = params[:password]



  	#登録されたユーザーか存在チェック
  	if User.find_by(name: params[:name])
  		login(params)
  		puts 'exists'
  		redirect_to '/users'

  	else
      puts 'not exists'
  		flash[:error] = "存在しないユーザーです"
  		redirect_to root_path

  	end

  end



end
