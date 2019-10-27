Rails.application.routes.draw do
  devise_for :users
  root 'sheets#index'

  resources :users, only: [:show, :edit, :update]

end
