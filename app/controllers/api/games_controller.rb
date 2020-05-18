class Api::GamesController < ApplicationController
  def create
    game = Game.create
    game.players << Player.create(name: game_params[:username])
    render json: {
      status: "success",
      code: 200,
      game: {
        id: game.id,
        board: game.board,
        deck: game.deck,
        room: game.room,
        players: game.players
      }
    }
  end

  def show
    game = Game.find_by(room: params[:id])
    if game.nil?
      render json: {status: "error", code: 404, message: "Game not found with that code"}
    end

    if !game.players.any? {|p| p.name == params[:username]}
      game.players << Player.create(name: params[:username])
      GamesChannel.broadcast_to(game, {
        id: game.id,
        board: game.board,
        deck: game.deck,
        room: game.room,
        players: game.players
      })
    end

    render json: {
      status: "success",
      code: 200,
      game: {
        id: game.id,
        board: game.board,
        deck: game.deck,
        room: game.room,
        players: game.players
      }
    }
  end

  def update
    game = Game.find_by(room:game_params[:room])
    game_params[:cards].each do |card|
      game.board[game.board.index(card)] = game.deck.pop()
    end
    player = game.players.find_by(name:game_params[:username])
    player.score += 1

    if game.save
      GamesChannel.broadcast_to(game, {
        id: game.id,
        board: game.board,
        deck: game.deck,
        room: game.room,
        players: game.players
      })
      
      render json: {
        status: "success",
        code: 200,
        game: {
          id: game.id,
          board: game.board,
          deck: game.deck,
          room: game.room,
          players: game.players
        }
      }
    else
      render json: {status: "error", code: 400, message: "something went wrong when saving"}
    end

  end

  private

  def game_params
    params.require(:game).permit(
      :id,
      :room,
      :username,
      cards: [],
      drawn_cards: []
    )
  end
end
