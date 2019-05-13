Rails.application.routes.draw do
  devise_for :users
  get 'messages' => 'messages#index'
end
