class Api::GamesController < ApplicationController
  def create
    game = Game.create
    game.players << Player.create(name: game_params[:username])
    render json: {
      status: "success",
      code: 201,
      game: {
        id: game.id,
        board: game.board,
        deck: game.deck,
        room: game.room,
        players: game.players.sort_by(&:score).reverse
      }
    }
  end

  def show
    game = Game.find_by(room: params[:id])
    if game.nil?
      render json: {status: "error", code: 404, message: "Game not found with that code"} and return
    end

    if !game.players.any? {|p| p.name == params[:username]}
      game.players << Player.create(name: params[:username])
      GamesChannel.broadcast_to(game, {
        id: game.id,
        board: game.board,
        deck: game.deck,
        room: game.room,
        players: game.players.sort_by(&:score).reverse
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
        players: game.players.sort_by(&:score).reverse
      }
    }
  end

  def update
    game = nil
    case params[:actionToTake]
    when "score"
      game = Game.find_by(room:game_params[:room])
      game_params[:cards].each do |card|
        if game.board.length <= 12
          game.board[game.board.index(card)] = game.deck.pop()
        else
          game.board[game.board.index(card)] = nil
        end
      end
      game.board.compact!
      
      player = game.players.find_by(name:game_params[:username])
      player.score += 1
      player.save
    when "draw 3"
      game = Game.find_by(room: params[:id])
      player = game.players.find_by(name:game_params[:username])
      player.status == "draw" ? player.update(status: "") : player.update(status: "draw")

      if game.players.all?{|p| p.status == "draw"}
        game.board.push(*game.deck.shift(3))
        game.players.each do |player|
          player.update(status: "")
        end
      end
    end

    if game.save
      GamesChannel.broadcast_to(game, {
        id: game.id,
        board: game.board,
        deck: game.deck,
        room: game.room,
        players: game.players.sort_by(&:score).reverse
      })
      
      render json: {
        status: "success",
        code: 200
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
