class LoginController < ApplicationController
include LoginHelper



	def new

	end



	def login
	  @user = User.new()
	  @user.name = params[:name]
	  @user.password = params[:password]

	  # session[:name] = params[:name]
   #    session[:password] = params[:password]

   	#セッション情報が無い場合(1回もログインしていない場合)、セッションに情報を保存
	  if session[:name] == nil

		  if User.find_by(name: params[:name]) == nil
		  	flash[:error] = "存在しないユーザーです"
		  	# byebug
		  	# render root_path
		  	# render ('login/login')
		  	redirect_to root_path
		  end

	    # login2(params)
	  end
   redirect_to '/users'


	 end

end
