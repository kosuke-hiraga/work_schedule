Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'session#new'


  get  '/login',   to:  'session#create'
  get  '/help',    to: 'static_pages#help'


  get '/users',  to: 'users#show'
  # post '/users',  to: 'users#show'


  get '/work_schedule',  to: 'work_schedule#show'
  post '/work_schedule',  to: 'work_schedule#create'


  post '/work_schedule/getList',     to: 'work_schedule#getList'
  post '/work_schedule/getProject',  to: 'work_schedule#getProject'

  resources :session
end
