defmodule YouechoWeb.QuestionView do
  use YouechoWeb, :view

  def render_question(question) do
    if question.answer_pronounce do
      "<td>#{question.question}</td> <td class=\"pronounce\">#{question.answer}<br/><span class=\"speech\"><span></td>"
    else
      "<td class=\"pronounce\">#{question.question}<br/><span class=\"speech\"><span></td> <td>#{question.answer}</td>"

    end
  end

  def render_attrs_question(question) do
    if question.answer_pronounce do
      "say=\"#{question.question}\" answer=\"#{question.answer}\""
    else
      "say=\"#{question.answer}\" answer=\"#{question.question}\""
    end
  end
end
