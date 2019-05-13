class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit  # editアクションのviewを表示
    end
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
end

# The former(require) is used to mark parameters as required. The latter(permit) is used to set the parameter as permitted and limit which attributes should be allowed for mass updating.
