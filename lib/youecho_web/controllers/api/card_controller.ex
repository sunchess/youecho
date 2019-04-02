defmodule YouechoWeb.API.CardController do
  use YouechoWeb, :controller
  alias Youecho.Cards

  def update(conn, %{"id" => id}) do
    value = Cards.Card.increment(id)
    render(conn, "update.json", value: value)
  end

end
