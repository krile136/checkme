Rails.application.routes.draw do
  devise_for :users
  root 'sheets#index'

  resources :users, only: [:index, :show, :edit, :update]
  resources :sheets, only: [:new, :create, :edit, :update, :destroy, :show] do
    member do
        patch :update_date
    end
  end
  resources :items, only: [:update]
  resources :cooperate_requests, only: [:create, :destroy]
end
