class Api::GamesController < ApplicationController
  def create
    byebug
    game = Game.create
    game.players << Player.create(name: game_props[:username])
    render json: game
  end

  def show
    byebug
    game = Game.find_by(room: params[:room])
    if !game.players.any? {|p| p.name == game_props[:username]}
      game.players << Player.create(name: game_props[:username])
      GamesChannel.broadcast_to(game, game)
    end

    render json: Game.find_by(room: params[:room])
  end

  def update
  end

  private

  def game_props
    params.require(:game).permit(
      :id,
      :username,
      drawn_cards: []
    )
  end
end
