Rails.application.routes.draw do
  devise_for :users
  root 'sheets#index'

  resources :users, only: [:show, :edit, :update]
  resources :sheets, only: [:new, :create, :edit, :update, :destroy, :show] do
    member do
        patch :update_date
    end
  end

  resources :items, only: [:update]
end
