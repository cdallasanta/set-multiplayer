class GameController < ApplicationController
  def index

  end

  def create
    g = Game.create
    g.players << Player.create(name: game_props[:username])
    render json: g
  end

  def show
    game = Game.find_by(room: params[:room])
    if game.players
    render json: Game.find_by(room: params[:room])
  end

  def update
  end

  private

  def game_props
    params.require(:game).permit(
      :id,
      :username
    )
  end
end
