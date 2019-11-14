Rails.application.routes.draw do
  devise_for :users
  root 'sheets#index'

  resources :users, only: [:index, :show, :edit, :update]
  resources :sheets, only: [:index, :new, :create, :edit, :update, :destroy, :show] do
    member do
      patch :update_date
    end
    collection do
      get :get_check
    end
  end
  resources :items, only: [:update]
  resources :cooperate_requests, only: [:create, :destroy] do
    member do
      delete :reject
      patch :accept
    end
  end
end
