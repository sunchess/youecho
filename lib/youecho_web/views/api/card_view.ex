defmodule YouechoWeb.API.CardView do
  use YouechoWeb, :view

  def render("update.json", %{value: value}) do
    %{count: value}
  end
end
